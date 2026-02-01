const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const sliderController = require('../controllers/sliderController');
const fileUpload = require('express-fileupload');
// Middleware to protect dashboard

function isAuth(req, res, next){
    if(req.session.userId) next();
    else res.redirect('/login');
}

router.get('/', isAuth, dashboardController.index);


router.get('/slider', isAuth, sliderController.index);
router.post('/slider/store', isAuth, sliderController.store);
router.post('/slider/update/:id', isAuth, sliderController.update);
router.get('/slider/delete/:id', isAuth, sliderController.destroy);


module.exports = router;
