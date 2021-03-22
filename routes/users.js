const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// TODO
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, message: 'You are Authorized!' })
});

router.post('/login', function (req, res, next) {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, message: 'User Not Found' })
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {
                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user, token: tokenObject.token, expiresIn: tokenObject.expires })
            } else {
                res.status(401).json({ success: false, message: 'Invalid Credentials' })
            }
        })
        .catch((err) => next(err));
});

router.post('/register', function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password)

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash,
        salt
    });

    newUser.save()
        .then((user) => {
            const jwt = utils.issueJWT(user);
            res.json({ success: true, user, token: jwt.token, expiresIn: jwt.expires })
        })
});

module.exports = router;