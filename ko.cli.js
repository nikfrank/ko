#!/usr/bin/env node
'use strict';

require('shelljs/global');
let fs = require('fs');
require.extensions['.tpl'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let args = process.argv.slice(2);
let pkg, files, cons;
try{
    pkg = require('./'+args[0]+'/package.json');
    files = pkg.files;
    cons = pkg.constants;

    mkdir('-p', args[1]);
}catch(e){
    console.error(e, 'no such ko command as '+args[0]);
    exit(1);
}

for(let i=files.length; i-->0;){
    
    // need to replace constants in all file-names and file-contents

    let filename = files[i];
    let blob = require('./'+args[0]+'/'+files[i]);

console.log(cons, filename);

    for(let con in cons){
        filename = filename.replace(con, cons[con]);
        blob = blob.replace(con, cons[con]);
    }

console.log(filename);

    blob.to(args[1]+'/'+filename);

}

console.log(ls());
