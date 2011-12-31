var passport = require('passport')
  , FoursquareStrategy = require('passport-foursquare').Strategy;

passport.use(new FoursquareStrategy({
    clientID: FOURSQUARE_CLIENT_ID,
    clientSecret: FOURSQUARE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/foursquare/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ foursquareId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
