const express = require('express');
const router = express.Router();
const db = require('../models');

// Landing page route
router.get('/', async function(req, res, next) {
    try {
        let ads;

        if (req.query.search) {
            // If a search query is present, filter ads based on the search query
            ads = await db.Ad.findAll({
                where: {
                    approved: true,
                    title: {
                        [db.Sequelize.Op.like]: `%${req.query.search}%`,
                    },
                },
                order: [['createdAt', 'DESC']],
            });
        } else {
            // If no search query, fetch all approved ads
            ads = await db.Ad.findAll({
                where: {
                    approved: true,
                },
                order: [['createdAt', 'DESC']],
            });
        }

        const errorMessage = req.query.errorMessage || ''; // Get the error message from the query parameters
        const searchQuery = req.query.search || ''; // Get the search query from the query parameters
        res.render('index', { ads, user: req.cookies.user, errorMessage, searchQuery,title : 'Yad2-like Website' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});



// Login page route (POST)
router.post('/login', async function(req, res, next) {
    try {
        const { username, password } = req.body;

        // Check if the credentials are valid (you need to implement this logic)
        const isValidCredentials = await isValidUser(username, password);

        if (isValidCredentials) {
            // Set user information in cookies (including isAdmin)
            const user = await db.User.findOne({ where: { username } });
            res.cookie('user', { username: user.username, isAdmin: user.isAdmin });

            // Redirect back to the index page
            res.redirect('/admin');
        } else {
            // Invalid credentials, redirect to the index page with an error message
            res.redirect('/?errorMessage=Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Function to check if the user credentials are valid (replace with your logic)
async function isValidUser(username, password) {
    // Implement your logic to check if the user credentials are valid
    const user = await db.User.findOne({ where: { username, password } });
    return user;
}

module.exports = router;
