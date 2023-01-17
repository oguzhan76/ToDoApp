const express = require('express');
// const User = require('../models/user');
const Todo = require('../models/todo');
const { authByAccess } = require('../middleware/auth');
const formatDate = require('../utils/formatDate');

const router = new express.Router();

router.post('/newtodo', authByAccess, async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).send({ error: error._message});
    }
});

router.patch('/edit/:id', authByAccess, async(req, res) => {
    console.log('requested a patch ', req.body);
    try {
        const todo = await Todo.findOneAndUpdate({_id: req.params.id, owner: req.user._id }, req.body, { new: true});
        // throw new Error('bu error mesaji');
        res.status(200).send(todo.ReadyForClient());
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

router.delete('/delete/:id', authByAccess, async(req, res) => {
    try {
        await Todo.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        res.status(200).send();
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

router.get('/getList', authByAccess, async (req, res) => {
    try {
        const user = await req.user.populate('todos'); //{path: 'todos', select:['completed', 'text', 'createdAt' ]});
        const list = user.todos.map(todo => todo.ReadyForClient()).reverse();
        // throw new Error('ebeniz hakli')
        res.status(200).send(list);
    } catch (error) { // if mongoose error, theres error.name
        console.log(error);
        res.status(500).send({error: error.message});
    }
});

module.exports = router;