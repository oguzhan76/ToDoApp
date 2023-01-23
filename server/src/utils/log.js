const formatDate = require('./formatDate');
const Log = require('../models/serverlog');

const serverlog = async (message) => {
    try {
        const log = new Log({
            log: message,
            time: formatDate(Date.now())
        });
        await log.save();
    } catch (e) {

    }
}

module.exports = serverlog;