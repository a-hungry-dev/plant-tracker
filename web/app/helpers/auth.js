const jwt = require("jsonwebtoken")

const jwtKey = "super_secret_key"
const jwtExpirySeconds = 1800

const createSession = (user) => {
    return jwt.sign(user, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })
}

const isAuthed = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).end()
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }

    req.user = payload

    next()
}

module.exports = {
    createSession,
    isAuthed,
}