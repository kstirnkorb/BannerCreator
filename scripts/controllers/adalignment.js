'use strict';

angular.module('gepettoApp')
  .controller('AdalignmentCtrl', function ($scope) {
	
	var leftPosArray = [];
	var topPosArray = [];
	var farthestLeftEdgePos = 0;
	var farthestTopEdgePos = 0;
	var farthestRightEdgePos = 0;
	var farthestBottomEdgePos = 0;
	var alignmentBoundaryCenterPos = 0;
	var alignmentBoundaryMiddlePos = 0;
	
	$scope.elementsSelectable = false;  

	// Handler for the checkbox that appears in the Ad Alignment section. 
	// When the checkbox is selected the ad elements become 'selectable' in 
	// terms of being able to be selected for valid alignment candidates. This 
	// is denoted with a red highlight class when an element is clicked on, then 
	// removed when clicked again.
	$('#checkboxAlign').click(function() {
		if ($(this).is(':checked')) {
			$scope.elementsSelectable = true;	
		} else {
			$scope.elementsSelectable = false;
			
			// Remove highlight on any selected class if alignment checkbox is off.
			$scope.elementViewTemplates.forEach(function(obj) {
				$('.newAdElement').find('[data-type="' + obj.type.toUpperCase() + '"]').removeClass('adElementActive');
			});
			
			clearCalculationVariables();
		}
		
		// Adds/removes the CSS for the red glowing border for any ad element that is clicked.
		$('.newAdElement').children().click(function() {
			$(this).toggleClass('adElementActive');
		});			
	});
	
	// Calculate the alignment boundary that we are working with between the ad elements
	// that are currently selected.
	function calculateAlignmentBoundary() {
		clearCalculationVariables();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				leftPosArray.push($(this).position().left);	
				topPosArray.push($(this).position().top);	
	
				if (($(this).position().left + $(this).width()) > farthestRightEdgePos) {
					farthestRightEdgePos = $(this).position().left + $(this).width();	
				}
				if (($(this).position().top + $(this).height()) > farthestBottomEdgePos) {
					farthestBottomEdgePos = $(this).position().top + $(this).height();	
				}
			}
		});	
		
		Array.min = function(array){
			return Math.min.apply(Math, array);
		};
		
		farthestLeftEdgePos = Array.min(leftPosArray);
		farthestTopEdgePos = Array.min(topPosArray);
		
		alignmentBoundaryCenterPos = ((farthestRightEdgePos - farthestLeftEdgePos) / 2) + farthestLeftEdgePos;
		alignmentBoundaryMiddlePos = ((farthestBottomEdgePos - farthestTopEdgePos) / 2) + farthestTopEdgePos;
	}
		
	// Adjust alignment for all selected ad elements left.
	$('#adAlignmentLeft').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('left',farthestLeftEdgePos);
			}
		});	
	});
	
	// Adjust alignment for all selected ad elements vertical.
	$('#adAlignmentVertical').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('left',(alignmentBoundaryCenterPos - ($(this).width() / 2)));
			}
		});
	});
	
	// Adjust alignment for all selected ad elements right.
	$('#adAlignmentRight').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('left',(farthestRightEdgePos - $(this).width()));
			}
		});	
	});
	
	// Adjust alignment for all selected ad elements top.
	$('#adAlignmentTop').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('top',farthestTopEdgePos);
			}
		});	
	});
	
	// Adjust alignment for all selected ad elements horizontal.
	$('#adAlignmentHorizontal').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('top',(alignmentBoundaryMiddlePos - ($(this).height() / 2)));
			}
		});
	});
	
	// Adjust alignment for all selected ad elements bottom.
	$('#adAlignmentBottom').click(function() {
		calculateAlignmentBoundary();
		
		$('.newAdElement').children().each(function() {
			if ($(this).hasClass('adElementActive') == true) {
				$(this).css('top',(farthestBottomEdgePos - $(this).height()));
			}
		});	
	});
	
	// Clear all calculation variables.
	function clearCalculationVariables() {
		leftPosArray = [];
		topPosArray = [];
		farthestLeftEdgePos = 0;
		farthestTopEdgePos = 0;
		farthestRightEdgePos = 0;
		farthestBottomEdgePos = 0;
		alignmentBoundaryCenterPos = 0;
		alignmentBoundaryMiddlePos = 0;
	}

  });
