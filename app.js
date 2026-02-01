const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');

const { sequelize } = require('./models');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    createParentPath: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// make flash available in all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

// DB test
sequelize.authenticate()
    .then(() => console.log('✅ Database connected!'))
    .catch(err => console.error('❌ DB error:', err));

// Server
app.listen(3000, () => {
    console.log('✅ Server running http://localhost:3000');
});
