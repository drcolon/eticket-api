var express= require('express');
var logger= require('./lib/logger');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

/**
* Locals
*/
var app = module.exports = express();
var port = process.env.PORT || 7000;

// parse json requests
app.use(bodyParser.json('application/json'));
app.use(cors());

var routerTicket= require('./eticket_modules/tickets');
app.use(routerTicket);

/**
* Start server if we're not someone else's dependency
*/
if (!module.parent) {
  mongoose.connect('mongodb://localhost/eticket-dev', function() {
  app.listen(port, function() {
    logger.info('eticket-api escuchando en http://localhost:%s/', port);
  });
});
}
