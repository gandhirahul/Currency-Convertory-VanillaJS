/**
  * @desc Caches the elements once visited in the DOM
*/

var cacheDOMelm = {

  cacheElm:{},

  getElm:function(elm,type){
    switch(type) {
        case 'id':
          return this.cacheElm[elm] || (this.cacheElm[elm] = document.getElementById(elm));
          break;
        case 'class':
          return this.cacheElm[elm] || (this.cacheElm[elm] = document.getElementByClassName(elm));
          break;
        default:
          return this.cacheElm[elm] || (this.cacheElm[elm] = document.querySelector(elm));
          break;
    }
    
	}
};

module.exports = cacheDOMelm;