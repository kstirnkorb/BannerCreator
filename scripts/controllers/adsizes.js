'use strict';

angular.module('gepettoApp')
  .controller('AdsizesCtrl', function ($scope, Adsizesservice) {
    
	// Reads in the Localization file so all copy can be displayed properly in the UI.  
   	Adsizesservice.query(function(data){
   		$scope.adSizes = data;
  	});
	
  });
