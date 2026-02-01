const { Slider } = require('../models');
const path = require('path');
const fs = require('fs');

const deleteImage = (image) => {
    const imgPath = path.join(__dirname, '..', 'public', 'uploads', 'sliders', image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
};

// List
exports.index = async (req, res) => {
    const sliders = await Slider.findAll({ order: [['id', 'DESC']] });

    res.render('pages/slider/index', {
        title: 'Slider',
        user: { name: req.session.userName || 'Admin' },
        sliders
    });
};

// Store
exports.store = async (req, res) => {
    console.log(req);
    try {
        let imageName = null;

        if (req.files && req.files.image) {
            imageName = Date.now() + path.extname(req.files.image.name);
            await req.files.image.mv(
                path.join(__dirname, '..', 'public', 'uploads', 'sliders', imageName)
            );
        }

        await Slider.create({
            title: req.body.title,
            details: req.body.details,
            image: imageName,
            status: req.body.status === '1'
        });
        req.flash('success', 'Slider added successfully!');
        res.redirect('/dashboard/slider');
    } catch (err) {
        console.log(err);
        res.send('Server Error');
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);
        if (!slider) return res.redirect('/dashboard/slider');

        let imageName = slider.image;

        if (req.files && req.files.image) {
            if (imageName) deleteImage(imageName);

            imageName = Date.now() + path.extname(req.files.image.name);
            await req.files.image.mv(
                path.join(__dirname, '..', 'public', 'uploads', 'sliders', imageName)
            );
        }

        await slider.update({
            title: req.body.title,
            details: req.body.details,
            image: imageName,
            status: req.body.status === '1'
        });
        req.flash('success', 'Slider updated successfully!');
        res.redirect('/dashboard/slider');
    } catch (err) {
        console.log(err);
        res.send('Update Error');
    }
};

// Delete
exports.destroy = async (req, res) => {
    const slider = await Slider.findByPk(req.params.id);
    if (slider?.image) deleteImage(slider.image);
    await slider.destroy();
    req.flash('success', 'Slider deleted successfully!');
    res.redirect('/dashboard/slider');
};
