angular.module('login.controller',[])
.factory('auth',['$http','$window',function($http,$window){
  var auth ={};

  auth.saveToken = function(token){
    $window.localStorage['ShowTracker']=token;
  };
  auth.getToken = function(){
    return $window.localStorage['ShowTracker'];
  };
  auth.isLoggedIn=function(){
    var token = auth.getToken();
    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return (payload.exp < Date.now() / 1000);

    }
    else{
      return false;
    }
  };
  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  }
  auth.register=function(user){
    return $http.post('/api/register',user).success(function(data){
      auth.saveToken(data.token);
    });
  };
  auth.logIn= function(user){
    return $http.post('/api/login',user).success(function(data){
      auth.saveToken(data.token);
    });
  };
  auth.logOut = function(){
    $window.localStorage.removeItem('ShowTracker');
  };
  return auth;
}])
      .controller('LoginController',['$scope', '$sce','$location', 'auth' ,
      function($scope, $sce,$location,auth){
        $scope.sce = $sce;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
        console.log(auth.currentUser() + ':'+ auth.isLoggedIn());
        $scope.register=function(){
          auth.register($scope.user).error(function(error){
            $scope.error=error;
          }).then(function(){
            $location.path('/')
          })
        };
        $scope.logIn = function(){
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $location.path('/');
      });
    };





    }]);
