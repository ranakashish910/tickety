const User = require('../models/users')
const getDashboard = async (req, res) => {
    try {
        const userData = await User.findById(req.session.userId);
        if (!userData) {
            return res.redirect('/auth/login');
        }
        res.render('user/userDashboard', { user: userData })
    } catch (err) {
        console.error("Dashboard Error:", err);
        if (!res.headersSent) {
            return res.status(500).send("Internal Server Error");
        }
    }
}
module.exports = { getDashboard };