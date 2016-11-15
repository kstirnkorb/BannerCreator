'use strict';

angular.module('gepettoApp')
  .controller('ContextpaletteCtrl', function ($scope) {

	// Handler for when one of the top tabs of the context palette is clicked.
	$('.tab').click(function() {
		if ($(this).hasClass("tab") === true) {
			$(this).removeClass('tab').addClass('tabActive');	
		} 
		$(this).parent().find('.tabActive').not(this).removeClass('tabActive').addClass('tab');	
	
		$('.bottomContent').css('display','none');

		switch ($(this).text()) {
			case $scope.loc[0].NEW_AD_ASSET_TEXT :
			case $scope.loc[0].NEW_AD_ASSET_BUTTON :
			case $scope.loc[0].NEW_AD_ASSET_IMAGE :
			case $scope.loc[0].NEW_AD_ASSET_VIDEO :
			case $scope.loc[0].NEW_AD_ASSET_GALLERY :
			case $scope.loc[0].NEW_AD_ASSET_CAROUSEL :
			case $scope.loc[0].NEW_AD_ASSET_SYMBOL :
			case $scope.loc[0].NEW_AD_ASSET_LOGO :
			case $scope.loc[0].NEW_AD_TAB_ELEMENT :
				$('#assetEditElement').fadeIn('fast');
				break;
			case $scope.loc[0].NEW_AD_TAB_EFFECTS :	
				$('#assetEditEffects').fadeIn('fast');
				break;
			case $scope.loc[0].NEW_AD_TAB_ANIMATION :	
				$('#assetEditAnimation').fadeIn('fast');
				break;		
		}
	});
	
	// Method that closes the context palette after the close button is clicked.
	$('.closeBtn').click(function() {
		$('.contextPalette, .bottomContent').css('display','none');
		$('.contextPalette').find('.tabActive').removeClass('tabActive').addClass('tab');	
		$('.contextPalette').find('.tab').first().addClass('tabActive');	
		$('#assetEditElement').fadeIn('fast');

		// Set default settings for the input elements on context palette.
		switch ($scope.currentAdAssetType) {
			case 'text' :
				$('#textAssetFont').prop('selectedIndex', 0);
				$('#textAssetSize').val('10');
				$('#textAssetLayer').val('1');
				$('#textAssetLetterSpacing').val('0.00');
				$('#textAssetLineHeight').val('1.25');
				$('#textAssetIndent').val('0.00');
				$('#textAssetText').val('');
				$('#textAssetURL').val('');
				$('.colorPicker').colorpicker({color:'#ffffff'});
				$('#textAssetColor').val('#ffffff');
				break;	
			case 'button' :
				$('#buttonAssetImage').prop('selectedIndex', 0);
				// Remove image thumb if it is set in any context palette.
				$('.imageAssetThumb').css('background-image','');
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				break;
			case 'image' :
				$('#imageAssetImage').prop('selectedIndex', 0);
				// Remove image thumb if it is set in any context palette.
				$('.imageAssetThumb').css('background-image','');
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				break;
			case 'symbol' :
				$('#symbolAssetImage').prop('selectedIndex', 0);
				// Remove image thumb if it is set in any context palette.
				$('.imageAssetThumb').css('background-image','');
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				break;	
			case 'logoImage' :
				$('#logoAssetImage').prop('selectedIndex', 0);
				// Remove image thumb if it is set in any context palette.
				$('.imageAssetThumb').css('background-image','');
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				break;					
		}
		
		// Remove keyboard listener on arrow key buttons to avoid 
		// overloading that event upon subsequent palette opens.
		// It will get rebound when a user opens a palette.
		$(window).unbind('keydown');

		// Reset resizing on the Ad Assets Controller (AdassetsCtrl).
		$scope.resetResizableFunctionality();
		$scope.contextPaletteActive = false;
	});
	
  });
