'use strict';

//let utils = require('ko-gen/utils');

let utils = {
  lazyPrefix:(ret, Dpath)=>{
    let path = ret.split('/');
    let mp = Dpath.length, fails = 0;
    do{
      let can = true;
      for(let i=0; i<mp; ++i) can &= (path[i] === Dpath[fails+i]);
      if(can) break;
      mp--;
      fails++;
    }while(mp);
    for(let i=Dpath.length-mp; i-->0;) ret = Dpath[i] + '/' + ret;
    return ret;
  }
};

module.exports = {
  name:'directive',
  files:[
    'NAME.controller.js.tpl',
    'NAME.controller.spec.js.tpl',
    'NAME.directive.js.tpl',
    'NAME.directive.spec.js.tpl',
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
