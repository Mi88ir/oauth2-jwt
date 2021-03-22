const fs = require('fs');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const path = require('path');
const User = require('mongoose').model('User');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// const passportJWTOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY || 'secretPhrase',
//     issuer: 'enter issuer here',
//     audience: 'enter audience here',
//     algorithms: ['RS256'],
//     ignoreExpiration: false,
//     passReqToCallback: false,
//     jsonWebTokenOptions: {
//         complete: false,
//         maxAge: '2d',
//         clockTimestamp: '100',
//         nonce: 'String here for OpenID'
//     }
// }

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => done(err, null))
});
module.exports = (passport) => {
    passport.use(strategy);
}