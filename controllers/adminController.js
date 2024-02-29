// controllers/adminController.js
const db = require('../models');


// Logic to get all ads (including unapproved) for admin
const getAllAdsForAdmin = async (req, res) => {
    try {
        // Implement logic to fetch all ads for admin
        const ads = await db.Ad.findAll();
        res.render('admin',{ads});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Logic to approve an ad
const approveAd = async (req, res) => {
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
};


// Logic to delete an ad
const deleteAd = async (req, res) => {
    try {
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
};
// Logic to handle admin logout
const logoutAdmin = (req, res) => {
    // Clear the user cookie
    res.clearCookie('user');

    // Redirect to the login page
    res.redirect('/login');
};

// Logic to delete all ads
const deleteAllAds = async (req, res) => {
    try {
        // Implement logic to delete all ads
        await db.Ad.destroy({ where: {} });

        // Fetch all ads after deletion
        const ads = await db.Ad.findAll();

        // Render the admin page with the updated ads and a success  deleted all messages
        res.render('admin', { ads, user: req.cookies.user, title: 'Admin Page', welcomeMessage: 'Welcome to the Admin Page', approveAllMessage: false, deleteAllMessages: 'All ads deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Logic to approve all ads
const approveAllAds = async (req, res) => {
    try {
        // Implement logic to approve all ads
        await db.Ad.update({ approved: true }, { where: {} });

        // Fetch all ads after approval
        const ads = await db.Ad.findAll();

        // Render the admin page with the updated ads and a success message
        res.render('admin', { ads, user: req.cookies.user, title: 'Admin Page', welcomeMessage: 'Welcome to the Admin Page', approveAllMessage: 'All ads approved successfully',deleteAllMessages : false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    getAllAdsForAdmin,
    approveAd,
    deleteAd,
    logoutAdmin,
    deleteAllAds,
    approveAllAds,
};
