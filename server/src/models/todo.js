const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

todoSchema.methods.ReadyForClient = function() {
    return {
        _id: this._id,
        completed: this.completed,
        text: this.text,
        date: this.createdAt
    }
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;