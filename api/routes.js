var superagent = require('superagent');
var config = require('../config.json');
var mongoose=require('mongoose');
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
    app.post('/api/login', function(req,res,next){
      if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
      }
    app.post('api/:user/addShow',function(req,res,next){
      var id = req.showId;

    });

    });






}
