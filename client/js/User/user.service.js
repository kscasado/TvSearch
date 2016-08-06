angular.module('user.service',[])
        .factory('UserService', function($resource,auth){
          var o ={};

          o.addShow=function(ShowID){
              //var user = auth.currentUser()
              //console.log('userService show:'+showID);
              //console.log(user + showID);
              console.log('here'+ShowID);
              return $resource('/api/:user/:showID',{user:auth.currentUser(),showID:ShowID},{
              save: {
                method: 'POST'
              }


          });
      };
      return o;
    });
