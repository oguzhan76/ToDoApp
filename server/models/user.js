const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        //validate
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// tokens: {
//     access_token: {
//         type: String,
//         required: true
//     },
//     refresh_token: {
//         type: String
//     }
// }