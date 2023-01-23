const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authByAccess = async (req, res, next) => {
    const token = req.get('Authorization')?.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findOne({ _id: decoded._id});
        
        if(!user || user.access_token !== token)
            throw new Error(`User has no authorization`);
        req.user = user;
        next();

    } catch (e) {
        res.status(401).send({ error: e.message })
    }
}

// test this one
const authByRefresh = async (req, res, next) => { 
    try{
        if(!req.cookies.refresh_token) {  
            throw new Error('Unauthorized. You need to login!');
        }
        const token = req.cookies.refresh_token;
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findOne({ _id: decoded._id});
        
        if(!user || user.refresh_token !== token) {
            throw new Error();
        }
        
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