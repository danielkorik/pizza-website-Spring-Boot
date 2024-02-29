// authMiddleware.js
module.exports = {
    isAdmin: (req, res, next) => {
        // Your logic to check if the user is an admin
        if (req.cookies.user && req.cookies.user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({ error: 'Forbidden' });
        }

    },
};
