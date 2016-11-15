'use strict';

angular.module('gepettoApp')
  .controller('AssignmentCtrl', function ($scope, Assignmentservice) {
    
	// Reads in the list of database elements that can be assigned to ad assets.  
   	Assignmentservice.query(function(data){
   		$scope.assignments = data;
  	});
	
  });
