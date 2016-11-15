'use strict';

angular.module('gepettoApp')
  .service('Alignmentservice', function Alignmentservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/alignments.json');
  });
