module.exports = async (req, res) => {
    if(!req.cookies.token) return res.redirect('/login');
    return res.redirect('/gardens');
}