var fs = require('fs');

var log4js = require('log4js');
var config = require('config');

if (config.log4js.dir) {
  try {
    fs.mkdirSync(config.log4js.dir);
  } catch(e) {
    if (e.code != 'EEXIST') {
      console.error("Could not set up log directory, error was: ", e);
      process.exit(1);
    }
  }
}

log4js.configure(config.log4js.configure);

module.exports = log4js;
