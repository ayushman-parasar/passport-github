var passport = require("passport")
var User = require('../models/user')

var GitHubStrategy = require('passport-github').Strategy;



// github strategy

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile, "github")

    var user = {
      email: profile._json.email,
      name: profile.username,
      provider: profile.provider,
      github: {
        git_id: profile.id,
        name: profile.name
      }
    }
   
User.findOne({
  email: user.email
}, (err, foundUser) => {
  if (err) return done(err, null)
  if (foundUser) {
      done(null, foundUser)
   
  } else {
    User.create(user, (err, createdUser) => {
      // console.log(createdUser,"createdUser")
      if (err) return done(err, null)
      done(null, createdUser)
    })
  }
})

}));
passport.serializeUser((createdUser, done) => {
    console.log('serializer user_id', createdUser.id)
    done(null, createdUser.id)
  })
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, item) => {
      if (err) return done(err)
      done(null, item) //It means req.user = item it creates a key in req and assigns item to user
    })
})

