/**
 * Bootstraps the app and loads the index file when it's safe to load JS in DOM
 */

var DOMloaded = require('./utils/DOMloaded');
var index = require('./index');

var initFn = index.init.bind(index);
DOMloaded.check(initFn);
