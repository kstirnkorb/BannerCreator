'use strict';

angular.module('gepettoApp')
  .service('Assetimageservice', function Assetimageservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/assetimages.json');
  });
