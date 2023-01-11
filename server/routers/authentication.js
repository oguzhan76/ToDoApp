const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { authByRefresh, authByAccess }  = require('../middleware/auth');

const router = new express.Router();

const cookiesSettings = {
    maxAge: 86400000, // 1 day
    httpOnly: true,
    sameSite: true,
    secure: false
}

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        await user.generateAuthTokens();
        res.setHeader('Authorization', 'Bearer '+ user.access_token)
            .cookie('refresh_token', user.refresh_token, cookiesSettings)
            .send();
    }
    catch (e){
        console.log('sending error');
        return res.status(400).send({error: e.message});
    }    
});

router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    await user.generateAuthTokens();
    res.setHeader('Authorization', 'Bearer '+ user.access_token)
        .cookie('refresh_token', user.refresh_token, cookiesSettings)
        .send();

});

// handshake
router.get('/access_token', authByRefresh, async (req, res) => {
    if(!req.user)
        return res.send();
    
    const user = req.user;
    await req.user.generateAuthTokens();
    res.setHeader('Authorization', 'Bearer ' + user.access_token)
        .cookie('refresh_token', user.refresh_token, cookiesSettings)
        .send();
});


module.exports = router;