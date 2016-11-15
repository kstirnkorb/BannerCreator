'use strict';

angular.module('gepettoApp')
  .controller('AlignmentCtrl', function ($scope, Alignmentservice) {
    
	// Reads in the list of alignments that can be used for horizontally positioning text assets.  
   	Alignmentservice.query(function(data){
   		$scope.alignments = data;
  	});
	
  });
