const jwt = require('jsonwebtoken');
const jwtconfig = require('../config/Jwt.js')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(403).json({ error: 'Token missing' });
    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token
            , jwtconfig.secret)
        req.user_id = decode.user_id;
        next();
    } catch (err) {
        res.status(201).json({
            error:"Unauthorized"
        })
    }
}