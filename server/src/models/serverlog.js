const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    log: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now(),
    //     expires: 31000000 // 1 year in seconds
    // }
},{
    versionKey: false
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;