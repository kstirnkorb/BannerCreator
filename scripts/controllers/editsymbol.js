'use strict';

angular.module('gepettoApp')
  .controller('EditsymbolCtrl', function ($scope) {

	// Click handler for the trash icon button. Removes the currently active symbol ad element.  
	$('.iconTrash').click(function() {
		$('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]').remove();
		$('.contextPalette').fadeOut('fast');
		
		// We need to use Angular to reach into the ad assets scope and set the variable that 
		// lets that controller know that the context palette has been closed.
		angular.element(document.getElementById('newAdWrapper')).scope().contextPaletteActive = false;
		
		// Remove object from the scope ad asset array (adassets.js).
		for (var i = 0; i < $scope.currentAdAssets.length; i++) {
			if ($scope.currentAdAssets[i].id === $scope.currentAdAssetId) {
				$scope.currentAdAssets.splice(i,1);	
			}
		}
	});

  });
