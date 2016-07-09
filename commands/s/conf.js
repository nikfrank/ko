'use strict';

let utils = require('ko-gen');

module.exports = {
  name:'s',
  files:[
    's.js.tpl',
    's.spec.js.tpl'
  ],
  vars:[
    'PLACE',
    'NAME'
  ],
  varDefaults:[
    (args, cons)=>{
      let ret = args[1] || 'services/default-service';
      let Dpath = cons.service.defaultPath.split('/');
      return utils.lazyPrefix(ret, Dpath);
    },
    (args)=>(args[1].slice(1+args[1].lastIndexOf('/')))
  ]
}
