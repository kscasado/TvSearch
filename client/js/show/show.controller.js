angular.module('show.controller',[])
      .controller('ShowController',function($scope, ShowService,$sce,show,auth){
        $scope.sce = $sce;
        $scope.show=show;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.getShowDetails = function(){


          var show1 = SearchService.query({ showID:$scope.show.show.showID}, function(){
          $scope.show=show1;
        });


        $scope.hello='Hello World';
      }
      $scope.addShow=function(show){
        console.log(show);
      }
      $scope.checkImage = function(cast){
        if(cast.character.image===null){
          return false;
        }
        else{
          return true;
        }
      }
    });
