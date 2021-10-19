const mongoose = require('mongoose');

var date = getDate();
var dueDate = getDueDate();

const billSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true},
    issueDate: {type: String, default: date},
    dueDate: { type: String, default: dueDate },
    zoneName: { type: String, required: true },
    unitsConsumed: { type: Number, required: true },
    billAmount: { type: Number, required: true },
    status: { type: String, default: "Not Paid" },
    paymentDate: { type: String },
    month: { type: String }
});


function getDate(){
  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();

  date = date + "-" + month + "-" + year;
  return date;
}

function getDueDate(){

  var future = new Date();
  future.setDate(future.getDate() + 30);

  let date = ("0" + future.getDate()).slice(-2);
  let month = ("0" + (future.getMonth() + 1)).slice(-2);
  let year = future.getFullYear();
  let hours = future.getHours();
  let minutes = future.getMinutes();

  date = date + "-" + month + "-" + year;
  return date;
}


module.exports = mongoose.model('Bill', billSchema);
