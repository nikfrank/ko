'use strict';

let utils = require('ko-gen');

module.exports = {
  name:'cmp',
  files:[
    'NAME.controller.js.tpl',
    'NAME.controller.spec.js.tpl',
    'NAME.component.js.tpl',
    'NAME.component.spec.js.tpl',
    'NAME.html.tpl',
    'NAME.scss.tpl'
  ],
  vars:[
    'PLACE',
    'NAME',
    'PATH'
  ],
  varDefaults:[
    (args, cons)=>{
      let ret = args[1] || 'components/default-directive';
      let Dpath = cons.component.defaultPath.split('/');
      return utils.lazyPrefix(ret, Dpath);
    },
    (args)=>(args[1].slice(1+args[1].lastIndexOf('/'))),
    (args, cons)=>{
      if(args[1].indexOf(cons.component.servedFrom) === 0)
        return args[1].slice(cons.component.servedFrom.length);
      else return args[1];
    }
  ]
};
