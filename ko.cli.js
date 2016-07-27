#!/usr/bin/env node
'use strict';

require('shelljs/global');
let fs = require('fs');
require.extensions['.tpl'] = function(module, filename){
  module.exports = fs.readFileSync(filename, 'utf8');
};

let args = process.argv.slice(2);
let pkg, files, fileRewrites, cons, vars, argRewrites, templatePrefix, filePrefix = './';

let koCoreCommands = ['load', 'unload', 'update', 'link', 'unlink', 'cmd', 'pack'];

if(koCoreCommands.indexOf(args[0]) > -1){
  // run the core command.
  // load to npm i -D ko-pack, then sed the defaultParams into .ko-rc
  // unload just deletes the command and fileRewrites out the params
  // ko commands should be independent.

  // update just runs npm update ko-pack

  // link makes a symlink (does this work with npm i -D?) for local dev
  // unlink is the same as unload

  
  // load this command's package.
  try{ pkg = require('./commands/'+args[0]+'/conf.js');
  }catch(e){ console.error(e, 'error no ko command '+args[0]);exit(1);}
  templatePrefix = './commands/';
  
}else{
  // load the command from a pack

  // look through the package.json for ko packs
  // then look through those for this command
  let project = JSON.parse(cat('package.json'));
  let packs = Object.keys(project.devDependencies).filter(p=> !p.indexOf('ko-'));

  let i=0;
  while(!pkg && i<packs.length){
    let packConf = require(packs[i]+'/ko-pack.json');
    let commands = Object.keys(packConf.commands);
    // check that we have the command

    // then if yesh, require it
    if(commands.indexOf(args[0]) > -1){
      pkg = require(packs[i]+'/commands/'+args[0]+'/conf.js');
      templatePrefix = packs[i]+'/commands/';
    }
    i++;
  }
}

// find .ko-rc, filePrefix (root of project rel), constants
try{
  // look for this up the tree three levels
  // NOBDOY SHOULD EVER HAVE PROJECTS MORE THAN THREE LEVELS DEEP!
  // I kindof disagree now. this should be a loop that goes 10 deep?
  let cjs = exec('cat .ko-rc.json 2> .ko-logs');
  if(cjs.code){
    cjs = exec('cat ../.ko-rc.json 2> .ko-logs');
    filePrefix = '../';
  }
  if(cjs.code){
    cjs = exec('cat ../../.ko-rc.json 2> .ko-logs');
    filePrefix = '../../';
  }
  if(cjs.code){
    cjs = exec('cat ../../../.ko-rc.json 2> .ko-logs');
    filePrefix = '../../../';
  }
  cons = JSON.parse(cjs.output);
  rm('.ko-logs');

}catch(e){
  console.warn('warning! no ko rc found within . .. ../.. or ../../..');
  //    cons = {};
  //    filePrefix = './';
  exit(1);
}

// with pkg
files = pkg.files;
fileRewrites = pkg.fileRewrites;
vars = pkg.vars;
argRewrites = pkg.argRewrites;

// load core transformation functions
let xms = require('./ko-core-xms.js');
// how to load more transforms?


// set the default variable values (from eachother maybe!)
for(let i=vars.length; i-->0;) args[i] = args[i] || '';
for(let i=0; i<argRewrites.length; ++i) args[i+1] = argRewrites[i](args, cons);

// ko command place # first param is always where to put things
// this needs to be made optional for removals and general scripting (sed,...)
try{ mkdir('-p', filePrefix + args[1]);
}catch(e){
  console.error(e, 'error making directory '+args[1]+' for command '+args[0]);
  exit(1);
}


// render the files (and filenames)
for(let i=files.length; i-->0;){   
  // replace constants in all file-names and file-contents
  let filename = files[i];
  let blob = require(templatePrefix+args[0]+'/'+files[i]);

  for(let j=vars.length; j-->0;){
    filename = filename.replace((new RegExp(vars[j], 'g')), args[j+1]);
    if(args[j+1].length)
      for(let xm in xms)
        blob = blob.replace(xms[xm].regexp(vars[j]), xms[xm].fn(args[j+1]));
  }
  for(let j=vars.length; j-->0;)
    blob = blob.replace((new RegExp(vars[j], 'g')), args[j+1]);
  
  filename = filename.replace(/\.tpl$/g, '');

  for(let con in cons.regexps){
    filename = filename.replace((new RegExp(con, 'g')), cons.regexps[con]);
    blob = blob.replace((new RegExp(con, 'g')), cons.regexps[con]);
  }
  blob.to(filePrefix + args[1]+'/'+filename);
}

// run through jfileRewrites
(fileRewrites||[]).forEach(sed=>{
  sed = sed(args, cons);
  let blob = cat(filePrefix + args[1]+'/'+sed.filepath);
  blob = blob.replace(sed.match, sed.replace);
  blob.to(filePrefix + args[1]+'/'+sed.filepath);
});
