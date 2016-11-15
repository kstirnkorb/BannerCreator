'use strict';

angular.module('gepettoApp')
  .controller('GlobalimagesCtrl', function ($scope, Globalimageservice) {
	  
	var globalImageArray = [];
	var symbolImages = [];
	  
	// Reads in the list of global images that can be used in any ad.  
	Globalimageservice.query(function(data){
		globalImageArray = data;

		globalImageArray.forEach(function(obj) {
			if (obj.category == "Symbol") {
				obj.images.forEach(function(image) {
					symbolImages.push({'id':image.id,'name':image.name,'path':image.path});
				});
			} 
		});
		
		$scope.symbolImages = symbolImages;
  	});

  });
