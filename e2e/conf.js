'use strict';

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
    name:'e2e',
    files:[
        'NAME.po.js.tpl',
        'NAME.spec.js.tpl'
    ],
    vars:[
	'PLACE',
        'URL',
        'NAME'
    ],
    varDefaults:[
        (args, cons)=>{
            let ret = args[1] || 'e2e/main';
            let Dpath = cons.e2e.defaultPath.split('/');
            return utils.lazyPrefix(ret, Dpath);
        },
        (args)=>('/'+args[1].slice(1+args[1].lastIndexOf('/'))),
        (args)=>(args[1].slice(1+args[1].lastIndexOf('/')))
    ]
}

