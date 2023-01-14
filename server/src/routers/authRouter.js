const express = require('express');
const User = require('../models/user');
const { authByRefresh, authByAccess }  = require('../middleware/auth');

const router = new express.Router();

const cookiesSettings = {
    maxAge: 86400000, // 1 day
    httpOnly: true,
    sameSite: true,
    secure: false
}

// handshake
router.get('/access_token', authByRefresh, async (req, res) => {
    if(!req.user)
        return res.send(); 
    try {
        const user = req.user;
        await user.generateAuthTokens(); 
        res.setHeader('Authorization', 'Bearer ' + user.access_token)
            .cookie('refresh_token', user.refresh_token, cookiesSettings)
            .send();
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

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
        res.status(400).send({error: e.message});
    }    
});

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.generateAuthTokens();
        res.setHeader('Authorization', 'Bearer '+ user.access_token)
        .cookie('refresh_token', user.refresh_token, cookiesSettings)
        .send();
    } catch (error) {
        if(error.code === 11000)
            res.status(400).send({error: 'Username not available'})
        else
            res.status(400).send({error: error.message});
    }
});

router.get('/logout', authByAccess, async (req, res) => {
    const user = req.user;
    user.access_token = '';
    user.refresh_token = '';
    await user.save();
    res.status(200).clearCookie('refresh_token').send({ logout: true});
});

module.exports = router;