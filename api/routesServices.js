var superagent = require('superagent');

var routes_services = function() {
    var getShowInfoService= function(showID) {
      superagent
            .get('http://api.tvmaze.com/search/shows?q='+req.params.tvshow)
            .query({json:true})
            .end(function (err,response){
              if(err){
                return res.send(err);
              }
              else{
                return response.body;


              }

            });
    }



    return {
        getShowInfoService: getShowInfoService

    }
}();

module.exports = routes_services;
