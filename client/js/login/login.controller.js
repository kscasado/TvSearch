angular.module('login.controller',[])
      .controller('LoginController',function($scope, LoginService,$sce,$location){
        $scope.sce = $sce;
        $scope.showList=null;
        $scope.isLoggedIn=false;
        $scope.login=function(user){

          if( LoginService.query({ login: $scope.user, pw:$scope.pw})){

          }
        }
        $scope.getShows = function(){


          var shows = SearchService.query({ tvshow: $scope.tvShow}, function(){
          $scope.showList=shows;

        });
        $scope.getShowDetails = function(showID){

          $location.path('/show/'+showID);

        };


      }
    });
