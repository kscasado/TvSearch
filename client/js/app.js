angular.module('app', ['ngMaterial','ui.bootstrap','ngRoute', 'ngResource', 'search.controller', 'search.service',
'login.controller', 'show.controller', 'show.service','user.service'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/search.html',
          controller: 'SearchController'
        })
        .when('/show/:showid',{
          templateUrl:'views/show.html',
          controller:'ShowController',
          resolve:{
            show: ['ShowService','$route', function(ShowService,$route){
              return ShowService.get({showid: $route.current.params.showid},function(){

              });
            }]


          }
        })
        .when('/:user/',{
          templateUrl:'views/user.html',
          controller:'UserController',
          resolve:{
            showList:['UserService','$route',
            'auth',function(UserService,$route,auth){
              return UserService.getUserShows(),function(){

              });
            }]
          }
        })
        .when('/login',{
          templateUrl:'views/login.html',
          controller:'LoginController'

        })

        .otherwise({
          redirectTo: '/'
        });
          $locationProvider.html5Mode(true);
      }]);
