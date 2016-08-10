var superagent = require('superagent');

var routesServices = function(){
    var getShowInfoService= function(showID) {
      superagent
            .get('http://api.tvmaze.com/search/shows?q='+showID)
            .query({json:true})
            .end(function (err,response){
              if(err){
                return response.send(err);
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

module.exports = routesServices;
