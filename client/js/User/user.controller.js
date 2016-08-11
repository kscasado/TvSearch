angular.module('user.controller',[])
      .controller('UserController',function($route,$scope,$sce,userShowList,
                  UserService,auth){
        $scope.showList = userShowList;
        console.log($scope.showList);

        $scope.removeShow=function(showID){
          var check = UserService.removeShow(showID).save(function(){
            $route.reload();
          });
        }
    });
