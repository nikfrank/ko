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
  name:'p',
  files:[
    'p.js.tpl',
    'p.spec.js.tpl',
    'p.html.tpl',
    'p.css.tpl'
  ],
  vars:[
    'PLACE',
    'NAME',
    'PATH'
  ],
  varDefaults:[
    (args, cons)=>{
      let ret = args[1] || 'app';
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
