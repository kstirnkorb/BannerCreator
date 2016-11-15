'use strict';

angular.module('gepettoApp')
  .controller('AdcolorCtrl', function ($scope) {

	var colorTypeSetting = 'hex'; 
	$('.adColorTypeBtn').css('background-position','0px -16px');
	
	// Initializer for the Bootstrap Color Picker component.
	$('.adColorPicker').colorpicker({format:'hex',color:'#FFFFFF'}).on('changeColor', function(e){
		$('.adColorPicker').val(e.color.toHex().toUpperCase());
		$('.newAdElement').css('background-color',$('#adColor').val());
	});  	  

	// Method for switching the button states of the color type button. 
	// Settings include: 'rgba' 'rgb' 'hex'.
	$('.adColorTypeBtn').click(function() {
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
