'use strict';

angular.module('gepettoApp')
  .controller('AdcontainerCtrl', function ($scope) {

	// This method contains all the handler methods for the element position buttons
	// in the top nav and for the arrow keys on a users keyboard.
	$scope.setUpHandlers = function() {
		// Adds or removes the CSS for the red glowing border for the ad elements.
		$('.adContainer').children().click(function() {
			$(this).toggleClass('adElementActive');
			closeTopNavSubMenus();
		});
		
		// Moves the selected element(s) a pixel up per click.
		function moveElementUp(element) {
			var newUp = $(element).position().top - 1;
			$(element).css('top', newUp + 'px');
		}
		
		// Moves the selected element(s) a pixel right per click.
		function moveElementRight(element) {
			var newRight = $(element).position().left + 1;
			$(element).css('left', newRight + 'px');
		}
		
		// Moves the selected element(s) a pixel down per click.
		function moveElementDown(element) {
			var newDown = $(element).position().top + 1;
			$(element).css('top', newDown + 'px');
		}
		
		// Moves the selected element(s) a pixel left per click.
		function moveElementLeft(element) {
			var newLeft = $(element).position().left - 1;
			$(element).css('left', newLeft + 'px');
		}
		
		// Method for detecting directional arrow buttons that have been clicked. These control the position of the ad elements.
		window.addEventListener('keydown', function(e) {
			if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
				switch (e.keyCode) {
					case 38 :
						$('.adContainer').find('div').each(function() {
							if ($(this).hasClass('adElementActive') === true) {
								moveElementUp($(this));
							}
						});
						break;
					case 39 :
						$('.adContainer').find('div').each(function() {
							if ($(this).hasClass('adElementActive') === true) {
								moveElementRight($(this));
							}
						});
						break;
					case 40 :
						$('.adContainer').find('div').each(function() {
							if ($(this).hasClass('adElementActive') === true) {
								moveElementDown($(this));
							}
						});
						break;
					case 37 :
						$('.adContainer').find('div').each(function() {
							if ($(this).hasClass('adElementActive') === true) {
								moveElementLeft($(this));
							}
						});
						break;
				}
			}
		}, false);
		
		closeTopNavSubMenus();
	}
	
	// If any sub menus in the top nav are open this method closes them when a user interacts 
	// with an element outside of the submenu.
	function closeTopNavSubMenus() {
		$('#topNav').find('.subMenu').css('display','none');
	}
	
  });
