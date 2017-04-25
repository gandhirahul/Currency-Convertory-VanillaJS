/**
  * hideShowElm - Hides/Shows the DOM elements
*/

var cacheDOMelm = require('./utils/cacheDOMelm');

var hideShowElm = {

    hideElm:function(elm){
      
      var elm = cacheDOMelm.getElm(elm,'id');
      elm.style.display = 'none';

    },
    
    showElm:function(elm){

      var elm = cacheDOMelm.getElm(elm,'id');
      elm.style.display = 'block';

  	}
};

module.exports = hideShowElm;