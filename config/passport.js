var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User  = mongoose.model('User');

//use Local strategy, check if error exists, check for valid username
//and check for valid password
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username }, function (err,user){
      if(err) {return done(err);}
      if(!user){
        return done(null,false, {message: 'Incorrect Username.'});
      }
      if(!user.validPassword(password)){
        return done(null,false,{ message: 'Incorrect password.' });
      }
      return done(null,user);
    });
  }
));
