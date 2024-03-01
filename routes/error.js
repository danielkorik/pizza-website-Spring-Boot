const express = require('express');
const router = express.Router();

// Error route
router.get('/', function(req, res, next) {
    const errorMessage = req.query.errorMessage || 'Unknown Error';
    res.render('error', { errorMessage , message: `${errorMessage}`});
});
module.exports = router;
