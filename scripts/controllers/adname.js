'use strict';

angular.module('gepettoApp')
  .controller('AdnameCtrl', function ($scope) {
    
	$scope.adNameDefault = $scope.loc[0].NEW_AD_DEFAULT_NAME;

	// When the ad name input field is clicked clear out the present value 
	// if it is the default value.
	$('#adName').click(function() {
		if ($(this).val() === $scope.loc[0].NEW_AD_DEFAULT_NAME) {
			$(this).val('');
		}		
	});
	
	// Method for detecting Enter button click at log in.
	$('.newAdSideSectionContainer').keyup(function(e) {
		if (e.keyCode === 8){
			if ($('#adName').val() === String($scope.loc[0].NEW_AD_DEFAULT_NAME).substr(0,String($scope.loc[0].NEW_AD_DEFAULT_NAME).length - 1)) {
				$('#adName').val('');
				$('.newAdTitle').text($scope.loc[0].NEW_AD_MASTHEAD_TITLE);
			}	
		}
	});	
	
	// Method called from the DOM to process what to do when the ad name 
	// is changed from there.
	$scope.adNameChange = function() {
		if ($('#adName').val() === '') {
			$('#adName').val($scope.loc[0].NEW_AD_DEFAULT_NAME);
			$('.newAdTitle').text($scope.loc[0].NEW_AD_MASTHEAD_TITLE);
		} else if ($('#adName').val().indexOf($scope.loc[0].NEW_AD_DEFAULT_NAME) > -1) {
			var adNameValue = $('#adName').val();
			var adNameValue = adNameValue.split($scope.loc[0].NEW_AD_DEFAULT_NAME).join('');
			$('#adName').val(adNameValue);
			var adNameText = $scope.loc[0].NEW_AD_MASTHEAD_TITLE + " - " + adNameValue;
			$('.newAdTitle').text(adNameText);
		} else {
			var adNameText = $scope.loc[0].NEW_AD_MASTHEAD_TITLE + " - " + $('#adName').val();
			$('.newAdTitle').text(adNameText);
		}
	};
	
	// When the focus leave the ad name input field we want to make sure 
	// that some value is there - even if it is the default one. The 
	// mouseout event works great for that.
	$('#adName').mouseout(function() {
		if ($(this).val() === '') {
			$(this).val($scope.loc[0].NEW_AD_DEFAULT_NAME);	
		}
	});
	
  });
