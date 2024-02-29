const express = require('express');
const router = express.Router();
const db = require('../models');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../authMiddleware'); // Import isAdmin

// Route to render the admin page
router.get('/', isAdmin, async function(req, res, next) {
    try {
        // Fetch all ads from the database (including unapproved ones)
        const ads = await db.Ad.findAll({ order: [['createdAt', 'DESC']] });

        res.render('admin', { ads, user: req.cookies.user ,title: 'Admin Page',welcomeMessage: 'Welcome to the Admin Page' ,approveAllMessage : false,deleteAllMessages: false});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route to get all ads for admin with API endpoint
router.get('/api/ads', isAdmin, async (req, res) => {
    try {
        // Implement logic to fetch all ads for admin
        const ads = await db.Ad.findAll();
        res.json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to approve an ad
router.put('/api/ads/approve/:id', isAdmin, async (req, res) => {
    try {
        // Implement logic to update ad as approved
        const adId = req.params.id;
        const ad = await db.Ad.findByPk(adId);
        if (ad) {
            await ad.update({ approved: true });
            res.json({ message: 'Ad approved successfully' });
        } else {
            res.status(404).json({ error: 'Ad not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete an ad
router.delete('/api/ads/delete/:id', isAdmin, async (req, res) => {
    try {
        // Implement logic to delete an ad
        const adId = req.params.id;
        const ad = await db.Ad.findByPk(adId);
        if (ad) {
            await ad.destroy();
            res.json({ message: 'Ad deleted successfully' });
        } else {
            res.status(404).json({ error: 'Ad not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to delete all ads
router.post('/delete-all', isAdmin, adminController.deleteAllAds);

// Route to approve all ads
router.post('/approve-all', isAdmin, adminController.approveAllAds);

// Route for admin logout
router.post('/logout', adminController.logoutAdmin);

module.exports = router;
