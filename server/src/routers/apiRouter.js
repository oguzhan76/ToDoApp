const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');
const { authByAccess } = require('../middleware/auth');

const router = new express.Router();

router.post('/newtodo', authByAccess, async (req, res) => {
    const user = req.user;
    console.log(req.body);
    const newTodo = new Todo({completed: req.body.completed, text: req.body.text});
    await newTodo.save();
    res.send(newTodo);
});

module.exports = router;