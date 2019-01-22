'use strict';

angular.module('Application', [
  'ngRoute'
]).
config(['$locationProvider', '$interpolateProvider', '$routeProvider', function($locationProvider, $interpolateProvider, $routeProvider) {

    // URL prefix
    $locationProvider.hashPrefix('!');

    // Change angular interpolate symbols to prevent
    // clash with template engine
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.startSymbol(']]');

    // Application routing
    $routeProvider
      .when("/", {
          templateUrl : "/views/pages/page-landing.html"
      })
      .when("/faq", {
          templateUrl : "/views/pages/page-faq.html"
      })
      .when("/ourteam", {
          templateUrl : "/views/pages/page-ourteam.html"
      })
      .when("/resources", {
          templateUrl : "/views/pages/page-resources.html"
      })
}])

.run(['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
    $rootScope.$on("$locationChangeSuccess", function() {
        $anchorScroll();
    });
}]);
