const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//create model class from user model
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //user id refers to record id in mongo
  done(null, user.id);
});

//id is the user.id passed from serializeUser
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //check if User exists in database already
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (existingUser) {
          //null since no error
          done(null, existingUser);
        } else {
          //make a new record (model instance) with this new unique ID
          new User({
            googleID: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
