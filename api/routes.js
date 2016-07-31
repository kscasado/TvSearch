var superagent = require('superagent');
var config = require('../config.json');
var mongoose=require('mongoose');
var passport=require('pasport');
var User=mongoose.model('User');
module.exports = function(app){

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
    app.post('/api/register'),function(req,res,next){
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


    app.post('api/:user/addShow',function(req,res,next){
      var id = req.showId;

    });









}
