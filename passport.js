const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

require("dotenv/config");

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies["access_token"];
  }
  return null;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null);
      });
    }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, null, { message: "Invalid username." });
      }
      user.comparePassword(password, done);
    });
  })
);
