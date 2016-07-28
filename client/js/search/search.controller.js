angular.module('search.controller',['ngSanitize'])
      .controller('SearchController',function($scope, SearchService,$sce,$location){
        $scope.sce = $sce;
        $scope.showList=null;
        $scope.getShows = function(){


          var shows = SearchService.query({ tvshow: $scope.tvShow}, function(){
          $scope.showList=shows;

        });
        $scope.getShowDetails = function(showID){

          $location.path('/show/'+showID);

        };

        $scope.hello='Hello World';
      }
    });
