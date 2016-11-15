'use strict';

angular.module('gepettoApp')
  .controller('EditimageCtrl', function ($scope) {

	var parentElement = document.getElementById(String($scope.currentAdAssetId));
	var childElement;
	var cssPropsString = '';
	var assetProps = [];
	var imageElement;
	
	$scope.imageAssetLayerDefault = '1';
	$scope.imageAssetAlphaDefault = '1.00';

	var imageScaleSetting = 'auto'; 
	$('.imageScaleBtn').css('background-position','0px -16px');
	$('.imageAssetThumb').css('background-size','contain');

	// Visibly shows a user that the size link has been turned on or off.
	$('.sizeLink').click(function() {
		$(this).toggleClass('sizeLinkActive');
	});

	// Click handler for the trash icon button. Removes the currently active image ad element.  
	$('.iconTrash').click(function() {
		$('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]').remove();
		$('.contextPalette').fadeOut('fast');
		
		// We need to use Angular to reach into the ad assets scope and set the variable that 
		// lets that controller know that the context palette has been closed.
		angular.element(document.getElementById('newAdWrapper')).scope().contextPaletteActive = false;
		
		$('#imageAssetImage').prop('selectedIndex', 0);
		$('#imageAssetLayer').val('1');
		$('.imageAssetThumb').css('background-image','url()');
		$('#imageActualImageAssetThumb').attr('src',null);
		
		// Remove object from the scope ad asset array (adassets.js).
		for (var i = 0; i < $scope.currentAdAssets.length; i++) {
			if ($scope.currentAdAssets[i].id === $scope.currentAdAssetId) {
				$scope.currentAdAssets.splice(i,1);	
			}
		}
	});
	
	// Handler method for when the image asset value is changed. Sets the necessary ad element properties 
	// both on the DOM and then also in the scoped asset property object.
	$('#imageAssetImage').change(function() {
		parentElement = document.getElementById(String($scope.currentAdAssetId));
		
		$(parentElement).css('width',$('#imageAssetWidth').val() + 'px');
		$(parentElement).css('height',$('#imageAssetHeight').val() + 'px');
		$(parentElement).css('left',$('#imageAssetX').val() + 'px');
		$(parentElement).css('top',$('#imageAssetY').val() + 'px');
		$(parentElement).css('z-index',$('#imageAssetLayer').val());
		
		cssPropsString + 'width:' + $('#imageAssetWidth').val() + 'px;';
		cssPropsString += 'height:' + $('#imageAssetHeight').val() + 'px;';
		cssPropsString += 'left:' + $('#imageAssetX').val() + 'px;';
		cssPropsString += 'top:' + $('#imageAssetY').val() + 'px;';
		cssPropsString += 'z-index:' + $('#imageAssetLayer').val() + ';';

		assetProps = [
						{'width':$('#imageAssetWidth').val() + 'px'},
						{'height':$('#imageAssetHeight').val() + 'px'},
						{'top':$('#imageAssetX').val() + 'px'},
						{'left':$('#imageAssetY').val() + 'px'},
						{'z-index':$('#imageAssetLayer').val()},
						{'imageURL':$(this).find(':selected').text()}
					];
					
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				obj.props = assetProps;	
			}
		});
		
		$('.imageAssetThumb').css('background-image','url(../' + $(this).find(':selected').text() + ')');
		$('#imageActualImageAssetThumb').attr('src','../' + $(this).find(':selected').text()).load(function() {
			$(parentElement).css('width',$(this).width()).css('height',$(this).height());
		});
		
		if ($(parentElement).find('svg').length > 0) {
			$(parentElement).find('svg').remove();
			
			imageElement = '<img id="imageActualImageAssetThumb" src="../' + $(this).find(':selected').text() + '" />';
			$(imageElement).appendTo(parentElement);
		} else {
			$(parentElement).find('img').remove();
			
			imageElement = '<img id="imageActualImageAssetThumb" src="../' + $(this).find(':selected').text() + '" />';
			$(imageElement).appendTo(parentElement);
		}
	});
	
	// Handler for when the image scale setting button is clicked. Settings include: 'auto' 'true'.
	$('.imageScaleBtn').click(function() {
		switch ($(this).css('background-position')) {
			case '0px 0px' :
				$(this).css('background-position','0px -16px');	
				$('.imageAssetThumb').css('background-size','contain');
				imageScaleSetting = 'auto';
				break;
			case '0px -16px' :
				$(this).css('background-position','0px 0px');	
				$('.imageAssetThumb').css('background-size','auto');
				imageScaleSetting = 'true';
				break;			
		}
	});
	
	// Handler method for when any individual DOM value related to the image ad element is modified 
	// from the context palette.
	$scope.imageAssetChange = function() {
		parentElement = document.getElementById(String($scope.currentAdAssetId));
		var imageURLSetting = '';
		
		$(parentElement).css('width',$('#imageAssetWidth').val() + 'px');
		$(parentElement).css('height',$('#imageAssetHeight').val() + 'px');
		$(parentElement).css('left',$('#imageAssetX').val() + 'px');
		$(parentElement).css('top',$('#imageAssetY').val() + 'px');
		$(parentElement).css('z-index',$('#imageAssetLayer').val());
		
		cssPropsString + 'width:' + $('#imageAssetWidth').val() + 'px;';
		cssPropsString += 'height:' + $('#imageAssetHeight').val() + 'px;';
		cssPropsString += 'left:' + $('#imageAssetX').val() + 'px;';
		cssPropsString += 'top:' + $('#imageAssetY').val() + 'px;';
		cssPropsString += 'z-index:' + $('#imageAssetLayer').val() + ';';
		
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				obj.props.forEach(function(prop) {
					if (prop['imageURL']) {
						imageURLSetting = prop['imageURL'];
					}
				});
			}
		});

		assetProps = [
						{'width':$('#imageAssetWidth').val() + 'px'},
						{'height':$('#imageAssetHeight').val() + 'px'},
						{'top':$('#imageAssetX').val() + 'px'},
						{'left':$('#imageAssetY').val() + 'px'},
						{'z-index':$('#imageAssetLayer').val()},
						{'imageURL':imageURLSetting}
					];
					
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				obj.props = assetProps;	
			}
		});
	};
	
	// Input DOM element change handler for the image ad element.
	$('#imageAssetWidth, #imageAssetHeight, #imageAssetX, #imageAssetY, #imageAssetLayer').on('input', function() {
		$scope.imageAssetChange();
	});

  });
