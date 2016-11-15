'use strict';

// This controller contains all the handler methods for the left nav element.
angular.module('gepettoApp')
  .controller('LeftnavCtrl', function ($scope) {
	
	var leftSlideActive = false;
	
	// Handler for when a user hovers over the left nav button.
	$('#btnLeftSlideToggle').hover(function() {
		$(this).animate({left: '-13px',},100);
	});
	
	// Handler for when a user mouses out from the left nav button.
	$('#btnLeftSlideToggle').mouseout(function() {
		$(this).animate({left: '-18px',},100);
	});
	
	// Handler for when a user clicks the left nav button. Brings in or hides
	// the left nav section.
	$('#btnLeftSlideToggle').click(function() {
		if (leftSlideActive == false) {
			$('#leftSlideContainer').animate({left:'0px'}, 'fast');
			$('#btnLeftSlideToggle').removeClass('off').addClass('on');
			leftSlideActive = true;
		} else {
			$('#leftSlideContainer').animate({left:'-222px'}, 'fast');
			$('#btnLeftSlideToggle').removeClass('on').addClass('off');
			leftSlideActive = false;
		}
	});
	
  });
