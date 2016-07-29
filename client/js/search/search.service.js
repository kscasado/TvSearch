angular.module('search.service',[])
        .factory('SearchService', function($resource){
          return  $resource('/api/:tvshow',{},{
            get: {
          method: 'GET',
          isArray:true}
      });
    });
