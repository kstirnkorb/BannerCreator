'use strict';

angular.module('gepettoApp')
  .service('Adsizesservice', function Adsizesservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/adSizesFull.json');
  });
