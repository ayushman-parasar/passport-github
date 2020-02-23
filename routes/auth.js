var express = require('express');
var router = express.Router();
var passport = require('passport')

// router.get('/', function(req, res, next) {
//   res.render('users', { title: 'hello' });
// });

/* GET users listing. */
router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/users'
    }), //session :false when we dont use  

    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


    module.exports = router;