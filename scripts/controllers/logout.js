'use strict';

angular.module('gepettoApp')
  .controller('LogoutCtrl', function ($scope) {

	// Bind and handle click event for the LOG OUT button. Method that logs a 
	// user out and resets app back to log in screen.
	$('#logOut').click(function() {	
		$('#logInTitle').css('display','block');
		$('#leftSlideContainer').css('display','block');
		
		// Bring in Log In section and reset some display items.
		$('#btnLeftSlideToggle').removeClass('on').addClass('off');

		$('#mainContainer, #topNav, #btnLeftSlideToggle').css('display','none');
		
		$('#logInSection, .mainTitle').fadeIn('slow', function() {
			$('#logInUserName').focus();
		});	
	
		// Method for detecting Enter button click at log in.
		$('#logInSection').keyup(function(event){
			if(event.keyCode === 13){
				reLogIn();
			}
		});
		
		// Handler for when a user hits the submit button from the Log In section.
		$('#logInSubmitBtn').click(function() {	
			reLogIn();
		});	
	});
	
	// Authenticates user during log in.
	function reLogIn() {
		$(document.body).css('background',null);
		
		// LOCAL app status check.
		if ($scope.appStatus != 'LOCAL') {
			// SERVICE CALL: Log in.
		} else {
			var username = $('#logInContainer').find('#logInUserName').val();
			var password = $('#logInContainer').find('#logInPassword').val();
	
			if ($('#logInContainer').find('#logInUserName').val() === $scope.appUserName && $('#logInContainer').find('#logInPassword').val() == $scope.appPassword) {
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
					
					reLoadUserPrefs();
				});
				
				// Unbind click handler on submit button.
				$('#logInSubmitBtn').unbind('click');
			} 
		}	
	}
	
	// Method for loading in the prefs for the user who has just logged in.
	function reLoadUserPrefs() {}	

  });
