const express = require('express')
const router = express.Router();

const { verifyToken, apiLimiter } = require('./middlewares')

router.get('/', apiLimiter, verifyToken, (req, res) => {
    const users= [
        { id: 1, name: 'Node.js'},
        { id: 2, name: 'npm'},
        { id: 3, name: 'roong'},
    ]

    // 모든 정보 제공
    res.json(users)
});

router.get('/:id', apiLimiter, verifyToken, async(req, res) => {
    const users = [
        { id: 1, name: 'Node.js'},
        { id: 2, name: 'npm'},
        { id: 3, name: 'roong'},
    ]

    // 특정 정보를 찾아서 제공
    user = users.find(u => u.id === parseInt(req.params.id));
    res.send(user);
})

module.exports = router;