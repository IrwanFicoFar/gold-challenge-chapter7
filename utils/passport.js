const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport');
const { User } = require('../models');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretkey";


passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const user = await User.findOne({ 
        where: {
            username: jwt_payload.username
        }
    })
    if (user) {
        return done(null, 
            {
                id: user.id,
                username: user.username,
                role: user.role
            })
    }else{
        return done(null, false)
    }
}));