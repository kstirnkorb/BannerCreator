'use strict';

angular.module('gepettoApp')
  .controller('FontsCtrl', function ($scope, Fontservice) {
	  
	// Reads in the list of fonts that can be used for creating/editing ad text assets.  
   	Fontservice.query(function(data){
		// Sort the names in ascending order.
		data.sort(function(a, b) {
			var a_name = a && a.name || "", b_name = b && b.name || "";
			return a_name.localeCompare(b_name);
		});
		
   		$scope.fonts = data;
  	});
	
  });
