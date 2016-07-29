angular.module('login.service',[])
        .factory('LoginService', function($resource){
          return  $resource('/api/:tvshow',{},{
            get: {
          method: 'GET',
          isArray:true}
      });
        });
