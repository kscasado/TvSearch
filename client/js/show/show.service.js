angular.module('show.service',[])
        .factory('ShowService', function($resource){
          //console.log($scope.showid);
          return  $resource('/api/shows/:showid',{},{
            get: {
              method: 'GET',
        isArray:false}
      });

  });
