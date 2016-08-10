angular.module('user.service',[])
        .factory('UserService', function($resource,auth){
          var o ={};

          o.addShow=function(ShowID){
              return $resource('/api/:user/:showID',{user:auth.currentUser(),showID:ShowID},{
              save: {
                method: 'POST'
              }


          });
      };
      return o;
    });
