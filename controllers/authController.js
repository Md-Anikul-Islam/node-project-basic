const { User } = require('../models');

exports.showRegister = (req, res) => res.render('auth/register');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.redirect('/login');
};

exports.showLogin = (req, res) => res.render('auth/login');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if(user && await user.validPassword(password)) {
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
