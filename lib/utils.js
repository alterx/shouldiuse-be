(function() {
  var CONFIG = require("./config.js");

  function log(message) {
    if(CONFIG.GENERAL.LOGS_ENABLED && console && console.log) {
        console.log('Should I use: ' , message);
    }
  }

  module.exports = {
    log: log
  }
})();
