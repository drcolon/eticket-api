var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var mongoose = require('mongoose');
// var host = 'http://localhost:3000';

var _ = require('lodash');

request = request(host);

describe('Admnistracion de tiquetes [/tickets]', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/eticket-dev', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
    mongoose.models = {};
  });

/*
sucursal: String,
text: String,
status: Number, // 1.WAITING | 2.IN_PROCESS | 3.FINISHED | 4.CANCELED
initialTime: Date,
//initServiceTime:Date,
//endServiceTime:Date,
userId:String,
*/

  describe('POST', function() {
    it('deberia crear una ticket', function(done) {
      var data = {
        "ticket": {
          "sucursal": "0",
          "text": "testTicket",
          "userId": "testUser1"
        }
      };

      request
      .post('/eticket')
      .set('Accept', 'application/json')
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .end(function(err, res) {
        var ticket;

        var body = res.body;
        // console.log('body', body);

        // Nota existe
        expect(body).to.have.property('ticket');
        ticket = body.ticket;

        // Propiedades
        expect(ticket).to.have.property('sucursal', '0');
        expect(ticket).to.have.property('text', 'testTicket');
        expect(ticket).to.have.property('userId', 'testUser1');
        expect(ticket).to.have.property('id');
        expect(ticket).to.have.property('initialTime');
        console.log("Ticket Generado");
        console.log(ticket);
        done(err);
      });
    });
  });



});
