angular.module('user.controller',[])
      .controller('UserController',function($scope,$sce,showList,auth){
        $scope.showList = showList;
        console.log($scope.showList);
    });
