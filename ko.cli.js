#!/usr/bin/env node
'use strict';

require('shelljs/global');
let fs = require('fs');
require.extensions['.tpl'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let args = process.argv.slice(2);
let pkg, files, cons, vars;
try{
    pkg = require('./'+args[0]+'/package.json');
}catch(e){
    console.error(e, 'error no ko command '+args[0]);
    exit(1);
}
files = pkg.files;
try{
    // need to find the package.json up the dir tree!
    // also, this only reads the constants if they're on one line!
    // read the constants out of the package.json in the root of this project
    let cjs = exec('cat ../package.json | grep ko-constants').output.trim();
    cons = JSON.parse(cjs.slice(1+cjs.indexOf(':')));
}catch(e){
    console.warn('warning no ko constants');
    cons = {};
}
    vars = pkg.vars;
try{
    mkdir('-p', args[1]);
}catch(e){
    console.error(e, 'error making directory '+args[1]+' for command '+args[0]);
    exit(1);
}

let dash2pascal = n=>
    (n[0].toUpperCase()+n.slice(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();}));
let dash2camel = n=>
    (n[0]+n.slice(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();}));


for(let i=vars.length; i-->0;) args[i] = args[i] || '';

// this is evil gnerator specific code! arg1 is PLACE arg-1 is NAME
if(!args[vars.length]) args[vars.length] = args[1].slice(1+args[1].lastIndexOf('/'));
if(vars.length>3){
    if(!args[vars.length-2]) args[vars.length-2] = args[vars.length];
    if(!args[vars.length-1]) args[vars.length-1] = '/'+args[2];
}
if(vars.length==3)if(!args[2]) args[2] = args[3];

console.log(args, vars);

for(let i=files.length; i-->0;){   
    // need to replace constants in all file-names and file-contents

    let filename = files[i];
    let blob = require('./'+args[0]+'/'+files[i]);

    for(let j=vars.length; j-->0;){
        filename = filename.replace((new RegExp(vars[j], 'g')), args[j+1]);
        if(args[j+1].length){
            blob = blob.replace((new RegExp('DASH2PASCAL\\('+vars[j]+'\\)', 'g')), dash2pascal(args[j+1]));
            blob = blob.replace((new RegExp('DASH2CAMEL\\('+vars[j]+'\\)', 'g')), dash2camel(args[j+1]));
        }
    }
    for(let j=vars.length; j-->0;){
        blob = blob.replace((new RegExp(vars[j], 'g')), args[j+1]);
    }
    filename = filename.replace(/\.tpl$/g, '');

    for(let con in cons){
        filename = filename.replace((new RegExp(con, 'g')), cons[con]);
        blob = blob.replace((new RegExp(con, 'g')), cons[con]);
    }
    blob.to(args[1]+'/'+filename);

}

console.log(ls(args[1].slice(0,args[1].lastIndexOf('/'))));
console.log(ls(args[1]));
