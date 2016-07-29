angular.module('login.controller',[])
      .controller('LoginController',function($scope, $sce,$location){
        $scope.sce = $sce;
        $scope.showList=null;
        $scope.isLoggedIn=false;
        $scope.login=function(user){

          return  $http.post('/api/login',user).success(function(data){
            console.log("Login success");
          });
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
