const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    log: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;