const express = require('express');
const User = require('../models/user');
const log = require('../utils/log');
const { authByRefresh, authByAccess }  = require('../middleware/auth');

const router = new express.Router();

const cookiesSettings = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

// handshake
router.get('/access_token', authByRefresh, async (req, res) => {  
    if(!req.user)
        return res.status(401).send();
    try {
        const user = req.user;
        await user.generateAuthTokens(); 
        res.setHeader('Authorization', 'Bearer ' + user.access_token)
            .cookie('refresh_token', user.refresh_token, cookiesSettings)
            .send();
        log(`${user.username} logged back in with refresh token`);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

router.post('/login', async (req, res) => {
    log(req.body.username + " logged in")
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
        log(req.body.username + 'signed up!');
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
    log(`${user.username} logged out`);
});

module.exports = router;