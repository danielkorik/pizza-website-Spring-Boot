// post-success.js
const express = require('express');
const router = express.Router();

// Post Success route (GET)
router.get('/', function(req, res, next) {
    const successMessage = req.query.successMessage || '';
    res.render('post-success', { successMessage , title: 'Success Page' });
});

module.exports = router;
