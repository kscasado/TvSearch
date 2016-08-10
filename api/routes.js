var superagent = require('superagent');
var config = require('../config.json');
var mongoose=require('mongoose');
var passport=require('passport');
var jwt = require('express-jwt');
var routeServices = require('./routesServices');
var User=mongoose.model('User');
module.exports = function(app){
var auth = jwt({secret:'SECRET',userProperty:'payload'});
/*
  Used to run a tvmze search call given a string
*/
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
    /*
      uses tvmaze api to get shows by their showid
    */
    app.get('/api/shows/:showID',function(req,res){
      superagent
        .get('http://api.tvmaze.com/shows/'+req.params.showID+'\?embed=cast')
        .query({json:true})
        .end(function(err,response){
          if(err){
            return res.send(err);
          }
          else{

            res.json(response.body);
          }
        });


    });
    app.post('/api/register',function(req,res,next){

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
    /*
    Used to login
    */
    app.post('/api/login', function(req,res,next){

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
    /*
      Used to add a show to the Users list
    */
    app.post('/api/:user/:showID',function(req,res){
      User.findOne({username:req.params.user},function(err,user){
        if(err){
          console.log('Unable to add show:'+err);
        }
        else{
          User.findByIdAndUpdate(
            user._id,
            {$addToSet: {"shows":req.params.showID}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                if(err){
                  console.log('unable to update user:'+err);
                }
                res.status(200).json(model);

            }
        );
        }
      });
    });

    /*
      return the shows that the user has on their shows list
    */
    app.get('/api/:user/shows',function(req,res,next){
      User.findOne({username:req.params.user},function(err,user){
        if(err){
          console.log('Unable to add show:'+err);
        }
        else{
          var showList=new Array();
          for(var i = 0; i<user.shows.length;i++){
              superagent
                .get('http://api.tvmaze.com/shows/'+user.shows[i])
                .query({json:true})
                .end(function(err,response){
                  if(err){
                    return res.send(err);
                  }
                  else{
                    showList.push(response.body);
                    //console.log('showList.length'+showList.length);
                    if(showList.length==user.shows.length){

                      res.send(showList);
                    }
                    }
                  });

            }
          }
      });
    });












}
