'use strict';

module.exports = {
  dash2pascal: {
    fn: n=>(n[0].toUpperCase()+n.slice(1).replace(/-([a-z])/g, g=> g[1].toUpperCase() )),
    regexp: v=>(new RegExp('DASH2PASCAL\\('+v+'\\)', 'g'))
  },
  dash2camel: {
    fn: n=>(n[0]+n.slice(1).replace(/-([a-z])/g, g=> g[1].toUpperCase() )),
    regexp: v=>(new RegExp('DASH2CAMEL\\('+v+'\\)', 'g'))
  }
};
