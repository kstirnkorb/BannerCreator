'use strict';

angular.module('gepettoApp')
  .service('Globalimageservice', function Globalimageservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/globalimages.json');
  });
