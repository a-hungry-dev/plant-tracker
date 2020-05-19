// https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/

const jwt = require("jsonwebtoken")

const jwtKey = "super_secret_key"
const jwtExpirySeconds = 1800

const createSession = (user) => {
    return jwt.sign({ user }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })

}

const isAuthed = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "You are not logged in" })
    }
    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "You are not logged in" })
        }
        return res.status(400).end()
    }
    req.user = payload.user;
    next()
}

const checkAuth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.redirect("/login")
    }
    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.redirect("/login")
        }
        return res.status(400).end()
    }
    next()
}

module.exports = {
    createSession,
    isAuthed,
    checkAuth
}