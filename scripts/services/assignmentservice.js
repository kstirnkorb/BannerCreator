'use strict';

angular.module('gepettoApp')
  .service('Assignmentservice', function Assignmentservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/assignments.json');
  });
