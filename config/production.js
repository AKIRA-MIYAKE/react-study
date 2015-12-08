var path = require('path');

module.exports = {
  log4js: {
    dir: path.resolve(__dirname, '../logs'),
    configure: {
      appenders: [
        // Access logs that connected express.
        {
          type: 'dateFile',
          filename: path.resolve(__dirname, '../logs/access.log'),
          pattern: '-yyyy-MM-dd',
          category: 'http'
        },
        // All logs that created log4js.
        {
          type: 'file',
          filename: path.resolve(__dirname, '../logs/app.log'),
          maxLogSize: 10485760,
          numBackups: 3
        },
        // Error logs that filtered ERROR.
        {
          type: 'logLevelFilter',
          level: 'ERROR',
          appender: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/errors.log')
          }
        }
      ]
    }
  }
};
