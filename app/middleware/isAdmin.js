module.exports = (req, res, next) => {
    if(req.user.role ===0) {
        return res.send({ code: 1001, message: 'You are not admin' });
    }
    next()
} 