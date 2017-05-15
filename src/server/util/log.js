var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: "dateFile",
      filename: "log/log.log",
      pattern: "-yyyy-MM-dd",
      alwaysIncludePattern: false
    }
  ]
});

module.exports = {
  log4js: log4js,
  logger: function(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
  }
};