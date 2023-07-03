const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const { verifyToken, tokenLimiter, apiLimiter, test } = require('./middlewares')
const { act } = require('./middletest')

const router = express.Router();

// middlewares.js
router.post('/', apiLimiter, async (req, res) => {

    var body_param = req.body;

    try {
        //console.log(req.body.id, req.body.nick)
        const id = req.body.id
        const nick = req.body.nick
        console.log(`${id} and ${nick}`)

        // jwt:sign() 메소드 : 토큰 발급
        const token = jwt.sign({
            id,
            nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: '토큰 발급자'
        });

        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.statuts(500).json({
            code: 500,
            message: '서버에러',
        });
    }
})

// middlewares.js
router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
})    

// middlewares.js
router.get('/test/:idx', test, (req, res) => {
    console.log(`text : `, text);
    res.json(req.idx);
})

router.get('/home', verifyToken, (req, res) => {
    res.render('home', { token: req.decoded });
});

router.get('/zzz', act, (req, res) => {
    var a = req.query.a;
    var b = req.query.b;
    console.log(a, b);
    res.json(req.calcul);
})

module.exports = router;