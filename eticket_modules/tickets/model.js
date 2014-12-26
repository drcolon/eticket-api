var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  sucursal: String,
  text: String,
  status: Number, // 1.WAITING | 2.IN_PROCESS | 3.FINISHED | 4.CANCELED
  initialTime: Date,
  //initServiceTime:Date,
  //endServiceTime:Date,
  userId:String,
  //clientApp:String
});

TicketSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

var model = mongoose.model('ticket', TicketSchema);

module.exports = model;
