var superagent = require('superagent');
var config = require('../config.json');

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
      console.log('http://api.tvmaze.com/shows/'+req.params.showID+'\?embed=cast');
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



}
