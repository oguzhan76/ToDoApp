const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authByAccess = async (req, res, next) => {
    const token = req.get('Authorization')?.replace('Bearer ', '');
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findOne({ _id: decoded._id});
        
        if(!user) throw new Error(`User has no authorization`);
        if(user.access_token === token)
            req.user = user;
        next();

    } catch (e) {
        res.status(401).send({ error: e.message })
    }
}

const authByRefresh = async (req, res, next) => { 
    if(!req.cookies.refresh_token) return next();
    try{
        const token = req.cookies.refresh_token;
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findOne({ _id: decoded._id});
        
        if(!user) throw new Error(`Couldn't find the user`);
        if(user.refresh_token === token)
            req.user = user
        next();
    }
    catch (e) {
        res.status(401).send({error: e.message || "Authorization Error."});
    }
}

module.exports = {
    authByAccess,
    authByRefresh
}