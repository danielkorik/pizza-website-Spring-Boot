const express = require('express');
const router = express.Router();

// Error route (GET)
router.get('/', function(req, res, next) {
    const errorMessage = req.query.errorMessage || 'Unknown Error';
    res.render('error', { errorMessage , message: `${errorMessage}`});
});
module.exports = router;
