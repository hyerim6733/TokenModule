const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const { verifyToken, tokenLimiter, test } = require('./middlewares')

const router = express.Router();

router.post('/', tokenLimiter, async (req, res) => {
    try {
        const id = 'vappet'
        const nick = 'hodoopapa'

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
        catch(error) {
            console.error(error);
            return res.statuts(500).json({
                code:500,
                message: '서버에러',
            });
        }
    
}) 

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
})

router.get('/test/:idx', test, (req, res) => {
    res.json(req.idx);
})

module.exports = router;