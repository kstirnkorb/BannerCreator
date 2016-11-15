'use strict';

angular.module('gepettoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'LocalizationCtrl'
      })
	  .when('/newAd', {
        templateUrl: 'views/newAd.html',
        controller: 'NewadCtrl'
      })
      .when('/view/:viewId', {
        templateUrl: 'views/view.html',
        controller: 'LocalizationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
