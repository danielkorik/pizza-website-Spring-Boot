const db = require('../models');

//login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database to find a user with the provided credentials
        const user = await db.User.findOne({
            where: {
                username: username,
                password: password,
            },
        });

        if (user) {
            // Redirect to the admin page if credentials are valid
            res.redirect('/admin');
        } else {
            // If credentials are wrong, redirect back to the login page with an error message
            res.redirect('/login?errorMessage=Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login?errorMessage=An error occurred during login');
    }
};

module.exports = { loginUser };
