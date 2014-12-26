var app = require('express')();
var logger= require('../../lib/logger');
var _ = require('lodash');


var db={};

var TicketStore = require('./model');

db['s1']=[
{'name':'ticket1','code': '001','office':'s1','_id':'1'},
{'name':'ticket2','code': '002','office':'s1','_id':'2'},
{'name':'ticket3','code': '003','office':'s1','_id':'3'}
];

app.get('/ticket', function(req, res) {
  res
  .status(200)
  .set('Content-Type','application/json')
  .json({
    tickets: db['s1']
  });
});

app.get('/eticket', function(req, res) {
  console.log('get all tickets');

  TicketStore.find({}).sort({'initialTime':1}).exec()
  .then(function(tickets) {

    var ticketFixed = tickets.map(function(ticket) {
      return ticket.toJSON();
    });

    res
    .status(200)
    .set('Content-Type','application/json')
    .json({
      tickets: ticketFixed,
      success:true
    });
  }, function(err) {
    console.log('err', err);
  })
});



app.route('/eticket/:id?')

  .all(function(req, res, next) {
      console.log(req.method, req.path, req.body);
      res.set('Content-Type','application/json');
      next();
  })

  //POST
  .post( function (req,res){
    //obtiene los datos básicos
    var ticket= req.body.ticket;
     ticket.status=1;
     ticket.initialTime= new Date();
     ticket.test="test ticket";

    // save to storage
    TicketStore.create(ticket)
    .then(function(ticket) {
      // response
      res
      .status(201)
      .json({
        ticket: ticket.toJSON(),
        success: true
      });
    });
});

module.exports= app;
