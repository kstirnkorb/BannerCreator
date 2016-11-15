'use strict';

angular.module('gepettoApp')
  .controller('AssetimagesCtrl', function ($scope, Assetimageservice) {
	  
	var assetImageArray = [];
	var companyImageArray = [];
	var companyImages = [];
	var companyLogoImages = [];
	var companyButtonImages = [];
	
	// Reads in the list of available images for an image asset.
	// Ultimately this list is filtered on the context palette by company.  
	Assetimageservice.query(function(data){
		assetImageArray = data;

		assetImageArray.forEach(function(obj) {
			obj.images.forEach(function(obj2) {
				obj2.images.forEach(function(image) {
					if (obj2.category == "Logo") {
						companyLogoImages.push({'company_id':obj.company_id,'company_name':obj.company_name,'id':image.id,'path':image.path});	
					} else if (obj2.category == "Button") {
						companyButtonImages.push({'company_id':obj.company_id,'company_name':obj.company_name,'id':image.id,'path':image.path});	
					}
					companyImages.push({'company_id':obj.company_id,'company_name':obj.company_name,'id':image.id,'path':image.path});	
				});
			});
			companyImageArray.push({'company_id':obj.company_id,'company_name':obj.company_name,'images':companyImages});
		});
		
		$scope.companyImages = companyImages;
		$scope.companyLogoImages = companyLogoImages;
		$scope.companyButtonImages = companyButtonImages;
  	});

	// Gets and sets the current selected company id. This is used to filter the image 
	// list from the DOM for that specific company.
	$('.companySelectBox').change(function() {
		$scope.companyId = $('.companySelectBox').find(":selected").val();
		$scope.$apply();
		
		// Remove image thumb if it is set in any context palette. Also
		// set default settings.
		$('.imageAssetThumb').css('background-image','');
		$('.imageAssetThumb').css('background-size','contain');
		$('.buttonImageScaleBtn').css('background-position','0px -16px');
		$('.imageImageScaleBtn').css('background-position','0px -16px');
		$('.logoImageScaleBtn').css('background-position','0px -16px');
	});

  });
