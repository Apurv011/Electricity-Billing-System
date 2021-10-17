const mongoose = require('mongoose');

var date = getDate();

const billSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    issueDate: {type: String, default: date},
    dueDate: { type: String, required: true },
    zone: { type: String, required: true },
    billAmount: { type: Number, required: true },
    status: { type: String },
    paymentDate: { type: String }
});


function getDate(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  date = year + "-" + month + "-" + date + " " + hours + ":" + minutes ;
  return date;
}


module.exports = mongoose.model('Bill', billSchema);
