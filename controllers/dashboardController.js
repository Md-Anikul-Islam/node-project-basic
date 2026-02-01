exports.index = (req, res) => {
    // If user not logged in, redirect
    if (!req.session.userId) return res.redirect('/login');
    // Render dashboard and pass everything from controller
    res.render('dashboard/index', {
        title: 'Dashboard',           // page title
        user: { name: req.session.userName || 'Admin' } // user info
    });
};




