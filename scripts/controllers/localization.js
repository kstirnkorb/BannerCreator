'use strict';

angular.module('gepettoApp')
  .controller('LocalizationCtrl', function ($scope, LocalizationService) {
	  
	// Reads in the Localization file so all copy can be displayed proeprly in the UI.  
   	LocalizationService.query(function(data){
   		$scope.loc = data;
  	});
	
  });
