var superagent = require('superagent');
var config = require('../config.json');
var mongoose=require('mongoose');
var passport=require('passport');
var jwt = require('express-jwt');

var User=mongoose.model('User');
module.exports = function(app){
var auth = jwt({secret:'SECRET',userProperty:'payload'});
// app.param('user', function(req, res, next, id) {
// var query = User.findById(id);
//
// query.exec(function (err, post){
// if (err) { return next(err); }
// if (!user) { return next(new Error('can\'t find post')); }
// console.log(user);
// req.post = post;
// return next();
// });
// });
    app.get('/api/:tvshow',function(req,res){


          superagent
              .get('http://api.tvmaze.com/search/shows?q='+req.params.tvshow)
              .query({json:true})
              .end(function (err,response){
                if(err){
                  return res.send(err);
                }
                else{
                  res.json(response.body);


                }

              });
    });
    app.get('/api/shows/:showID',function(req,res){


      //console.log('http://api.tvmaze.com/shows/'+req.params.showID+'\?embed=cast');
      superagent
        .get('http://api.tvmaze.com/shows/'+req.params.showID+'\?embed=cast')
        .query({json:true})
        .end(function(err,response){
          if(err){
            return res.send(err);
          }
          else{
            console.log(response.body);
            res.json(response.body);
          }
        });


    });
    app.post('/api/register',function(req,res,next){
      console.log(req.body);
      if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Not all fields filled'});
      }
      var user = new User();
      user.username = req.body.username;
      user.setPassword(req.body.password);
      user.save(function(err){
        if(err){return next(err);}
        return res.json({token: user.generateJWT()})
      });
    });

    app.post('/api/login', function(req,res,next){
      console.log(req.body);
      if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
      }
      passport.authenticate('local',function(err,user,info){
        if(err){ return next(err); }
        if(user){
          return res.json({token: user.generateJWT()});
        }
        else{
          return res.status(401).json(info);
        }
      })(req,res,next)
    });

    app.post('/api/:user',function(req,res,next){
      console.log('in the api/user');
    });
    app.post('/api/:user/:showID',function(req,res,next){
      console.log('in the adShow');
      var user;
      console.log(req.params.user);
      User.findOne({username:req.params.user},function(err,user){
        if(err){
          console.log(err);
        }
        else{
          User.findByIdAndUpdate(
            user._id,
            {$addToSet: {"shows":req.params.showID}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                console.log('user');
                console.log(err);
            }
        );
        }


      });

      User.findByIdAndUpdate(
        User.find(),
        {$push: {"shows":req.params.showID}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log('user');
            console.log(err);
        }
    );

    });









}
