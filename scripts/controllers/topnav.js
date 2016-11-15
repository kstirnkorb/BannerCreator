'use strict';

angular.module('gepettoApp')
  .controller('TopnavCtrl', function ($scope) {
	  
	// Top nav link handler.
	$('.link').hover(function() {
		
		var subMenuObject = $(this).next();
		
		switch ($(this).attr('id')) {
			case 'menuFile' :
				if ($(subMenuObject).css('display') !== 'block') {
					$('#topNav').find('.subMenu').not(subMenuObject).css('display','none');
					$(subMenuObject).css('top',String($(this).position().top + 30) + 'px').css('left',String($(this).position().left + 20) + 'px');
					$(subMenuObject).slideToggle('fast');
				}
				break;	
			case 'menuEdit' :
				if ($(subMenuObject).css('display') !== 'block') {
					$('#topNav').find('.subMenu').not(subMenuObject).css('display','none');
					$(subMenuObject).css('top',String($(this).position().top + 30) + 'px').css('left',String($(this).position().left + 20) + 'px');
					$(subMenuObject).slideToggle('fast');
				}
				break;
			/*	
			case 'menuView' :
				var newWindowURL = document.URL;
				newWindowURL = newWindowURL.substr(0,newWindowURL.indexOf('#')) + '#/view/12345';
				window.open(newWindowURL, '_blank');
				break;
			*/		
			case 'menuTools' :
				if ($(subMenuObject).css('display') !== 'block') {
					$('#topNav').find('.subMenu').not(subMenuObject).css('display','none');
					$(subMenuObject).css('top',String($(this).position().top + 30) + 'px').css('left',String($(this).position().left + 20) + 'px');
					$(subMenuObject).slideToggle('fast');
					break;
				}	
			case 'menuHelp' :
				//
				break;			
			case 'save' :
				//
				break;							
		}
	});

	// Top nav link handler.
	$('.subLink').click(function() {
		var subMenuObject = $(this).next();
	
		switch ($(this).text()) {
			case 'New Ad' :
				var newWindowURL = document.URL;
				newWindowURL = newWindowURL.substr(0,newWindowURL.indexOf('#')) + '#/newAd';
				window.open(newWindowURL, '_blank');
				break;						
		}
	});
	
	// This detects if the user has done something via the mouse outside of the app window.
	// If so we want to close any sub menus that might be displayed.
	$(window).blur(function() {
		$('#topNav').find('.subMenu').css('display','none');
	});	
	
	// If a user clicks in the main container area then close all menus.
	$('#mainContainer').click(function() {
		$('#topNav').find('.subMenu').css('display','none');
	});

  });
