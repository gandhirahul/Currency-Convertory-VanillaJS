/**
 * Loads the callback when DOM loading is complete
 */

var DOMloaded = {
	
  check:function(init){

    if(document.readyState === "complete") {
      init();
    }
    else {
      document.addEventListener("DOMContentLoaded", function () {
        init();
      }, false);

    }
	}
};

module.exports = DOMloaded;