'use strict';

angular.module('gepettoApp')
  .service('Fontservice', function Fontservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/fonts.json');
  });
