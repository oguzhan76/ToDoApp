const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');
const { authByAccess } = require('../middleware/auth');
const formatDate = require('../utils/formatDate');
const { formToJSON } = require('axios');

const router = new express.Router();

router.post('/newtodo', authByAccess, async (req, res) => {
    const user = req.user;
    const newTodo = new Todo({ 
        ...req.body,
        owner: user._id
    });
    await newTodo.save();
    res.status(201).send({ 
        _id: newTodo._id, 
        completed: newTodo.completed,
        text: newTodo.text,    
        date: formatDate(newTodo.createdAt)
    });
});

router.patch('/edit/:id', authByAccess, async(req, res) => {
    console.log('requested a patch ', req.body);
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).send(todo.ReadyForClient());
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

router.get('/getList', authByAccess, async (req, res) => {
    const user = await req.user.populate('todos'); //{path: 'todos', select:['completed', 'text', 'createdAt' ]});
    const list = user.todos.map(todo => todo.ReadyForClient()).reverse();
    res.send(list);
});

module.exports = router;