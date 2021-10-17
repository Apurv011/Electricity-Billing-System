const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    cost: { type: Number, required: true },
    zoneId: { type: Number, required: true },
    zoneName: { type: String, required: true }
});

module.exports = mongoose.model('Zone', zoneSchema);
