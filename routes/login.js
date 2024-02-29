// routes/login.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Login page route (GET)
router.get('/', function(req, res, next) {
    res.render('login', { errorMessage: '' , title: 'Login Page'}); // Pass an empty string to errorMessage
});

// Login page route (POST)
router.post('/', async function(req, res, next) {
    try {
        const { username, password } = req.body;

        // Check if the credentials are valid (you need to implement this logic)
        const isValidCredentials = await isValidUser(username, password);

        if (isValidCredentials) {
            // Set user information in cookies (including isAdmin)
            const user = await db.User.findOne({ where: { username } });
            res.cookie('user', { username: user.username, isAdmin: user.isAdmin });

            // Redirect to the admin area
            res.redirect('/admin');
        } else {
            // Invalid credentials, render the login page with an error message
            res.render('login', { errorMessage: 'Invalid username or password' , title: 'Login Page'});
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
    console.log(user);
    return !!user;
}

module.exports = router;
