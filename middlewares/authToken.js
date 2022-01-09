const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')


        const verified = jwt.verify(token, 'nguyenvuong')
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}

module.exports = auth