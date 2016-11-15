'use strict';

angular.module('gepettoApp')
  .controller('AdpropertiesCtrl', function ($scope) {

	var adSize = "";
	var adSizes = "";
	var adSizeWidth = "";
	var adSizeHeight = "";
	var defaultAdSizeWidthValue = $scope.loc[0].NEW_AD_DEFAULT_WIDTH;
	var defaultAdSizeHeightValue = $scope.loc[0].NEW_AD_DEFAULT_HEIGHT;
	var currentAdWidth = 0;
	var currentAdHeight = 0;
	
	$scope.adSizeWidthDefault = defaultAdSizeWidthValue;
	$scope.adSizeHeightDefault = defaultAdSizeHeightValue;
	$scope.adDraggable = true;
	
	// When the ad size select box realizes any change we try to immediately set the ad 
	// display to reflect those changes. If it is a cusztom sized ad we set the input 
	// fields up for that.
	$('.adSizeSelectBox').change(function() {
		if ($(this).val() === 'adSizeCustom') {
			$('.newAdElement').css('width','0px');
			$('.newAdElement').css('height','0px');
			$('#adSizeWidth').val(defaultAdSizeWidthValue);
			$('#adSizeHeight').val(defaultAdSizeHeightValue);
		} else {
			adSize = $(this).val().split('adSize').join('');
			adSizes = adSize.split('X');
			adSizeWidth = adSizes[0];
			adSizeHeight = adSizes[1];
	
			$('.newAdElement').css('width',String(adSizeWidth) + 'px');
			$('.newAdElement').css('height',String(adSizeHeight) + 'px');
			$('.newAdElement').css('background-color',$('#adColor').val()).css('opacity',1.0).css('filter','alpha(opacity=100)');
			
			$('#adSizeWidth').val(String(adSizeWidth));
			$('#adSizeHeight').val(String(adSizeHeight));
		}
	});
	
	// Handler for the the ad color is changed. When it is we update the background color of the ad right away.
	$('#adColor').change(function() {
		$('.newAdElement').css('background-color',$('#adColor').val());
	});
	
	// When a user clicks the width input field set the currentAdWidth variable.
	$('#adSizeWidth').click(function() {
		currentAdWidth = parseInt($(this).val());	
	});
	
	// When a user clicks the width input field set the currentAdHeight variable.
	$('#adSizeHeight').click(function() {
		currentAdHeight = parseInt($(this).val());	
	});
	
	// Called from the DOM. Once fired we change the ad width immediately.
	$scope.adSizeWidthChange = function() {
		$('.newAdElement').css('width',$('#adSizeWidth').val() + 'px');
		$('.newAdElement').css('opacity',1.0).css('filter','alpha(opacity=100)');
	};
	
	// Called from the DOM. Once fired we change the ad height immediately.
	$scope.adSizeHeightChange = function() {
		$('.newAdElement').css('height',$('#adSizeHeight').val() + 'px');
		$('.newAdElement').css('opacity',1.0).css('filter','alpha(opacity=100)');
	};
	
	// Method used to insure no bad characters are entered into the width input field.
	$('#adSizeWidth').change(function() {
		var element = $(this);
		
		// Test for presence of bad characters.
		var regTest = new RegExp('^[0-9]+$');
		if (regTest.test(element.val()) === false) {	
			$(this).val('');
		}
		$('.adSizeSelectBox').prop('selectedIndex', 0);
	});
	
	// Method used to insure no bad characters are entered into the height input field.
	$('#adSizeHeight').change(function() {
		var element = $(this);
		
		// Test for presence of bad characters.
		var regTest = new RegExp('^[0-9]+$');
		if (regTest.test(element.val()) === false) {	
			$(this).val('');
		}
		$('.adSizeSelectBox').prop('selectedIndex', 0);
	});
	
	// Handler method for when the trash icon is clicked. This removes any ad that was 
	// in progress and all children of that ad. Also resets default ad asset props 
	// along with a few other sections.
	$('.newAdSideSectionContainer').find('.iconTrash').click(function() {
		$('.newAdElement').children().remove();
		$('.newAdElement').css('opacity',0.0).css('filter','alpha(opacity=0)');
		$('.adSizeSelectBox').prop('selectedIndex', 0);
		$('#adSizeWidth').val(defaultAdSizeWidthValue);
		$('#adSizeHeight').val(defaultAdSizeHeightValue);
		$('.companySelectBox').prop('selectedIndex', 0);
		$('#adName').val($scope.loc[0].NEW_AD_DEFAULT_NAME);
		$('.newAdTitle').text($scope.loc[0].NEW_AD_MASTHEAD_TITLE);
		$('.adolorPicker').colorpicker({color:'#ffffff'});
		$('#adColor').val('#FFFFFF');
		
		$('.contextPalette, .bottomContent').css('display','none');
		$('.contextPalette').find('.tabActive').removeClass('tabActive').addClass('tab');	
		$('.contextPalette').find('.tab').first().addClass('tabActive');
			
		$('#assetEditCharacter').fadeIn('fast');
		
		$scope.currentAdAssets = null;
		$scope.currentAdAssetId = null;
		$scope.currentAdAssetType = null;		
		
		// Set other section defaults if it makes sense.
		$('#checkboxAlign, #checkboxDrag').prop('checked', false);
		$('#adLayerDetailContainer').children().remove();
		$scope.defaultSubSectionDisplay();
		$scope.adDraggable = false;
	});
	
	// Drag checkbox handler that lets a user drag that actual ad element itself if checked.
	$('#checkboxDrag').click(function() {
		if ($(this).is(':checked')) {
			$scope.adDraggable = true;
			// Intitialize draggable functionality.
			$('.newAdElement').draggable({
				containment: '.newAdElementContainer',
				start: newAdElementDragStart
			});
		} else {
			$scope.adDraggable = false;
		}
		
		// Adds/removes the CSS for the red glowing border for any ad element that is clicked.
		$('.newAdElement').children().click(function() {
			$(this).toggleClass('adElementActive');
		});			
	});
	
	// Use this method to see if the draggable state is set. If not, kill drag init.
	function newAdElementDragStart() {
		if ($scope.adDraggable == false) {
			$('.newAdElement').draggable('destroy');
		}
	}

  });
