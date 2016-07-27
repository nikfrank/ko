'use strict';

module.exports = {
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
  },

  dash2camel:kebab=>kebab.replace(/-([a-z])/g, m=>m[1].toUpperCase())
};
