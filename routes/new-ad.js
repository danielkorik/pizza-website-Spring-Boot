const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
//const  Ad  = require('../models').Ad;

// New Ad route (GET)
router.get('/', function(req, res, next) {
    const previousAdInfo = req.cookies.previousAdInfo || null;
    res.render('new-ad', { user: req.cookies.user, errorMessage: req.query.errorMessage, previousAdInfo });
});

router.post('/post-ad', async function(req, res) {
    try {
        const { title, email, price, phone, longDescription } = req.body;

        const newAd = await adsController.createAd({
            title: title,
            description: longDescription,
            price: price,
            phoneNumber: phone,
            email: email,
            approved: false,
        });
        // Save user's ad information in cookies for future use
        res.cookie('previousAdInfo', {
            email: email,
            lastAdPostedDate: new Date().toLocaleString(), // Adjust as needed for your date formatting
        });
        res.redirect(`/post-success?successMessage=Ad posted successfully&title=Success Page: ${newAd.get('title')}`);
    } catch (err) {
        console.error(err);
        res.redirect(`/error?errorMessage=Error posting ad. Please check your input.${err.message}`);
    }
});

module.exports = router;
