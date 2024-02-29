const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/new-ad');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const db = require('./models'); // Add this line
const postSuccessRouter = require('./routes/post-success');
const errorRouter = require('./routes/error');

const User = require('./models').User; // Add this line

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for sessions (add this if using user authentication)
 app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new-ad', adsRouter);
app.use('/login', loginRouter);
app.use('/post-success', postSuccessRouter);
app.use('/error', errorRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Sync the models with the database
db.sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });
async function initializeApp() {
    try {
        await db.sequelize.sync(); // This won't drop existing tables

        // Find or create the 'admin' user
        await db.User.findOrCreate({
            where: { username: 'admin' },
            defaults: { password: 'admin', isAdmin: true }
        });

        // Find or create the 'admin2' user
        await db.User.findOrCreate({
            where: { username: 'admin2' },
            defaults: { password: 'admin2', isAdmin: true }
        });

        console.log('Sample users created successfully');
    } catch (error) {
        console.error('Error initializing the app:', error);
    }
}
initializeApp();
module.exports = app;
