'use strict';

angular.module('gepettoApp')
  .controller('AdlayersCtrl', function ($scope) {
	  
	var layerElement;

	$scope.processAdLayers = function() {
		$('#adLayerDetailContainer').children().remove();
		
		$('.newAdElement').children().each(function() {
			var thisElement = document.getElementById($(this).attr('id'));

			switch (thisElement.getAttribute('data-type')) {
				case 'TEXT' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset text"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';	
					break;	
				case 'BUTTON' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset button"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;
				case 'IMAGE' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset image"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;
				case 'VIDEO' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset video"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;
				case 'GALLERY' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset gallery"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;
				case 'CAROUSELIMAGE' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset carouselImage"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;
				case 'SYMBOL' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset symbol"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;	
				case 'LOGOIMAGE' :
					layerElement = '<div class="layerDetailRow">' +
						'<div class="layerAsset logoImage"></div>' +
						'<input maxlength="3" class="adAssetSmallInput layerInput" value="' + String($(this).css('z-index')) + '">' +
					'</div>';				
					break;						
			}
			
			$(layerElement).prependTo('#adLayerDetailContainer');
			
		});	
	};			
	
  });
