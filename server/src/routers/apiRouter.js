const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');
const { authByAccess } = require('../middleware/auth');
const FormatDate = require('../utils/formatDate');

const router = new express.Router();

router.post('/newtodo', authByAccess, async (req, res) => {
    const user = req.user;
    const newTodo = new Todo({ 
        ...req.body,
        owner: user._id
    });
    await newTodo.save();
    res.send({ 
        _id: newTodo._id, 
        completed: newTodo.completed,
        text: newTodo.text,    
        date: FormatDate(newTodo.createdAt)//new Date(parseInt(newTodo.createdAt)).toLocaleString({second: 'none'})
    });
});

router.get('/getList', authByAccess, async (req, res) => {
    const user = await req.user.populate('todos'); //{path: 'todos', select:['completed', 'text', 'createdAt' ]});
    const list = user.todos.map(todo => ({ 
        _id: todo._id,
        completed: todo.completed,
        text: todo.text,
        date: new Date(parseInt(todo.createdAt)).toLocaleString()
    })).reverse();
    res.send(list);
});

module.exports = router;