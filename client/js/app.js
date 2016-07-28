angular.module('app', ['ngRoute', 'ngResource', 'search.controller', 'search.service','show.controller','show.service'])
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
        .otherwise({
          redirectTo: '/'
        });
          $locationProvider.html5Mode(true);
      }]);
