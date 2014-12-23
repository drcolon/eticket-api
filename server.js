var express= require('express');
var logger= require('./lib/logger');

/**
* Locals
*/
var app = module.exports = express();
var port = process.env.PORT || 7000;

/**
* Start server if we're not someone else's dependency
*/
if (!module.parent) {
  app.listen(port, function() {
    logger.info('eticket-api escuchando en http://localhost:%s/', port);
  });
}
