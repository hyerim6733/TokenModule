
const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');


exports.act = (req, res, next) => {
    var a = req.query.a;
    var b = req.query.b;
    
    try {
        let c = a/b;
        req.calcul = c;
    } 
    catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(400).json({
            code: 400,
            message: '그냥.'
        });
    }
    return next();

}

exports.cal = (req, res, next) => {
    var a = req.query.a;
    var b = req.query.b;
    
    try {
        let c = a/b;
        req.calcul = c;
    } 
    catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(400).json({
            code: 400,
            message: '그냥.'
        });
    }
    return next();

}