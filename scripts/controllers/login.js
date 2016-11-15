'use strict';

// Method that calls service to check if user is logged in. If so then skip Log In screen
// and direct to main app screen.
angular.module('gepettoApp')
  .controller('LoginCtrl', function ($scope) {
		
	var appVersion = '';
	var appLogoElementTitle = '';
	var $logo = angular.element('.logo');
	
	$scope.appStatus = angular.element(document.getElementById('appStatus')).scope().appStatus;
	$scope.appUserName = 'testuser';
	$scope.appPassword = 'g';
		
	if (appVersion !== '') {
		appLogoElementTitle = $logo.title + ' (' + appVersion + ')';
	} else {
		appLogoElementTitle = $logo.title;
	}
	
	$logo.title = appLogoElementTitle;
	angular.element('.logo2').title = appLogoElementTitle;

	initLogIn();
	
	// Fades in the Log In section elements and sets initial default app styles.
	function initLogIn() {	
		$('#topNav, #btnLeftSlideToggle').css('display','none');
		
		$('#logInSection, #mastheadTitle').fadeIn('slow', function() {
			$('#logInUserName').focus();
		});				
	}
	
	// Method for detecting Enter button click at log in.
	$('#logInSection').keyup(function(e) {
		if (e.keyCode === 13){
			logIn();
		}
	});	
	
	// Handler for when a user hits the submit button from the Log In section.
	$('#logInSubmitBtn').click(function() {	
		logIn();
	});
	
	// Authenticates user during log in.
	function logIn() {
		$(document.body).css('background',null);
		
		// LOCAL app status check.
		if ($scope.appStatus != 'LOCAL') {
			// SERVICE CALL: Log in.
		} else {
			var username = $('#logInContainer').find('#logInUserName').val();
			var password = $('#logInContainer').find('#logInPassword').val();
	
			if ($('#logInContainer').find('#logInUserName').val() === $scope.appUserName && $('#logInContainer').find('#logInPassword').val() == $scope.appPassword) {
				
				angular.element(document.getElementById('leftContainer')).scope().setUpHandlers();
				
				$('.mainTitle').fadeOut('fast');
				$('#logInSection').fadeOut('fast', function() {
					var currentWindowHeight = $(window).height();
					
					$('#mainContainer').css('min-height',currentWindowHeight);
					$('#leftContainer, #rightContainer').css('min-height',currentWindowHeight - 42).css('height',currentWindowHeight - 42);
					
					$('#mainContainer, #topNav, #btnLeftSlideToggle').fadeIn('slow');
					$('#logInContainer').find('#logInUserName').val('');
					$('#logInContainer').find('#logInPassword').val('');
					
					$('.userName').text(username);
					$('#logInSection').unbind('keyup');	
					
					loadUserPrefs();
				});
				
				// Unbind click handler on submit button.
				$('#logInSubmitBtn').unbind('click');
			} 
		}	
	}

	// Method for loading in the prefs for the user who has just logged in.
	function loadUserPrefs() {}
	
  });
