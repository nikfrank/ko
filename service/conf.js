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
    name:'service',
    files:[
        'NAME.service.js.tpl',
        'NAME.service.spec.js.tpl'
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
