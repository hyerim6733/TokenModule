const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.test = (req, res, next) => {
    var idx = req.params.idx
    if(idx < 10) {
        req.idx = `${idx}는 10보다 작은 수 입니다.`;
    } else if(idx == 10) {
        req.idx = `${idx}는 10 입니다.`;
    } else {
        req.idx = `${idx}는 10보다 큰 수 입니다.`;
    }
    return next();
} 

exports.verifyToken = (req, res, next) => {
    // 인증 완료
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        return next();
    }

    // 인증 실패 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
}

exports.tokenLimiter = RateLimit({
    windowMs: 1000 * 60, // 기준 시간 (1000ms * 60 = 1분)
    max: 1, // 허용 횟수
    delayMs: 0, // 호출 간격
    handler(req, res) { // 제한 초과 시 콜백함수
        res.status(this.statusCode).json({
            code: this.statusCode, // 기본값: 429
            message: '1분에 한 번만 요청할 수 있습니다.',
        });
    },
});

exports.apiLimiter = RateLimit({
    windowMs: 1000 * 60, // 기준 시간 (1000ms * 60 = 1분)
    max: 5, // 허용 횟수
    delayMs: 0, // 호출 간격
    handler(req, res) { // 제한 초과 시 콜백함수
        res.status(this.statusCode).json({
            code: this.statusCode, // 기본값: 429
            message: '1분에 최대 다섯 번 요청할 수 있습니다.',
        });
    },
});