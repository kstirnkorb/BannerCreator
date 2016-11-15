'use strict';

angular.module('gepettoApp')
  .controller('AdpalettecontainerCtrl', function ($scope) {

	var defaultAdSizeWidthValue = $scope.loc[0].NEW_AD_DEFAULT_WIDTH;
	var defaultAdSizeHeightValue = $scope.loc[0].NEW_AD_DEFAULT_HEIGHT;

	// Edit Container tab click handler.
	$('.editContainerTab').click(function() {
		$(this).parent().find('.editContainerTab').removeClass('editContainerTabActive');
		$(this).toggleClass('editContainerTabActive');
	});

  });
