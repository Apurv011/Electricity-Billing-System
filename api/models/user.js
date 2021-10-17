const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 8 });
var id = uid;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uId: { type: String, default: id },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String },
    zoneId: { type: String },
    role: { type: String, default:"user" },
    address: { type: String },
    contactNo: { type: Number, default: 123 },

});

module.exports = mongoose.model('User', userSchema);
