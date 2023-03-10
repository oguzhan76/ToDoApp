const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Todo = require('./todo');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 3)
                throw new Error('Username must be 3 or more characters');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 6)
                throw new Error('Password must be 6 or more characters')
        }
    },
    access_token: {
        type: String
    },
    refresh_token: {
        type: String
    }
});

userSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// remove all todos of user when user is deleted
userSchema.pre('remove', async function(next) {
    await Todo.deleteMany({ owner: this._id});
    next();
});

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if(!user)
        throw new Error('No such user!');
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        throw new Error('Wrong Password!')

    return user;
}

userSchema.statics.findByToken = async (token) => {
    const user = await User.findOne({refresh_token: token});
    return user;
}

userSchema.methods.generateAuthTokens = async function() {
    const access_token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_ACCESS_SECRET);
    const refresh_token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_REFRESH_SECRET);
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    await this.save();
}

// delete todos when the user is removed


const User = mongoose.model('User', userSchema);

module.exports = User;