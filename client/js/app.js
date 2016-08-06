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

              //console.log('This one');
              //console.log(ShowService.get({showid:1}));
              //console.log(//$routeParams);
              return ShowService.get({showid: $route.current.params.showid},function(){

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
