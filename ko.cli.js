#!/usr/bin/env node
'use strict';

require('shelljs/global');
let fs = require('fs');
require.extensions['.tpl'] = function(module, filename){
    module.exports = fs.readFileSync(filename, 'utf8');
};

let args = process.argv.slice(2);
let pkg, files, cons, vars, varDefaults, filePrefix = './';

try{ pkg = require('./'+args[0]+'/conf.js');
}catch(e){ console.error(e, 'error no ko command '+args[0]);exit(1);}

try{
    // look for this up the tree three levels
    // NOBDOY SHOULD EVER HAVE PROJECTS MORE THAN THREE LEVELS DEEP!
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

files = pkg.files;
vars = pkg.vars;
varDefaults = pkg.varDefaults;

// can't me load this from a xms.js?
let xms = {
    dash2pascal: {
        fn: n=>(n[0].toUpperCase()+n.slice(1).replace(/-([a-z])/g, g=> g[1].toUpperCase() )),
        regexp: v=>(new RegExp('DASH2PASCAL\\('+v+'\\)', 'g'))
    },
    dash2camel: {
        fn: n=>(n[0]+n.slice(1).replace(/-([a-z])/g, g=> g[1].toUpperCase() )),
        regexp: v=>(new RegExp('DASH2CAMEL\\('+v+'\\)', 'g'))
    }
};

// set the default variable values (from eachother maybe!)
for(let i=vars.length; i-->0;) args[i] = args[i] || '';
for(let i=0; i<varDefaults.length; ++i)
    args[i+1] = varDefaults[i](args, cons);

try{ mkdir('-p', filePrefix + args[1]);
}catch(e){
    console.error(e, 'error making directory '+args[1]+' for command '+args[0]);
    exit(1);
}

for(let i=files.length; i-->0;){   
    // replace constants in all file-names and file-contents

    let filename = files[i];
    let blob = require('./'+args[0]+'/'+files[i]);

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

console.log(ls(filePrefix + args[1].slice(0,args[1].lastIndexOf('/'))));
console.log(ls(filePrefix + args[1]));
