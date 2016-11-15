'use strict';

angular.module('gepettoApp')
  .controller('ColorCtrl', function ($scope) {
	
	var colorTypeSetting = 'hex'; 
	$('.colorTypeBtn').css('background-position','0px -16px');
	
	// Initializer for the Bootstrap Color Picker component.
	$('.colorPicker').colorpicker({format:'hex',color:'#FFFFFF'}).on('changeColor', function(e){
		$('.colorPicker').val(e.color.toHex().toUpperCase());
		$scope.textAssetChange();
	});

	// Method for switching the button states of the color type button. 
	// Settings include: 'rgba' 'rgb' 'hex'.
	$('.colorTypeBtn').click(function() {
		switch ($(this).css('background-position')) {
			case '0px 0px' :
				$(this).css('background-position','0px -16px');	
				colorTypeSetting = 'hex';
				break;
			case '0px -16px' :
				$(this).css('background-position','0px -32px');	
				colorTypeSetting = 'hsl';
				break;
			case '0px -32px' :
				$(this).css('background-position','0px 0px');	
				colorTypeSetting = 'rgba';
				break;				
		}
	});

  });
