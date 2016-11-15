'use strict';

angular.module('gepettoApp')
  .controller('MovecontrolCtrl', function ($scope) {
	  
	var moveCandidateElement;
	
	// This method contains all the handler methods for the 4 directional position buttons
	// in the context edit palette and for the arrow keys on a users keyboard.
	
		// The top round button hover handler - adds/removes a white glow around the button.
		$('.editRndBtn').hover(function() {
			moveCandidateElement = document.getElementById(String($scope.currentAdAssetId));
			$(this).toggleClass('glow');
		});
		
		// The click handler for the move up button.
		$('.moveUp').click(function() {
			moveElementUp($(moveCandidateElement));
		});
		
		// The click handler for the move right button; moves the selected element(s) a pixel right per click.
		$('.moveRight').click(function() {
			moveElementRight($(moveCandidateElement));
		});
		
		// The click handler for the move down button; moves the selected element(s) a pixel down per click.
		$('.moveDown').click(function() {
			moveElementDown($(moveCandidateElement));
		});
		
		// The click handler for the move left button; moves the selected element(s) a pixel left per click.
		$('.moveLeft').click(function() {
			moveElementLeft($(moveCandidateElement));
		});
		
		// Moves the selected element(s) a pixel up per click.
		function moveElementUp(element) {
			if ($('.contextPalette').css('display') !== 'none') { 
				var newUp = $(element).position().top - 1;
				$(element).css('top', newUp + 'px');
				setContextPaletteSizeInputValues();
			}
		}
		
		// Moves the selected element(s) a pixel right per click.
		function moveElementRight(element) {
			if ($('.contextPalette').css('display') !== 'none') { 
				var newRight = $(element).position().left + 1;
				$(element).css('left', newRight + 'px');
				setContextPaletteSizeInputValues();
			}
		}
		
		// Moves the selected element(s) a pixel down per click.
		function moveElementDown(element) {
			if ($('.contextPalette').css('display') !== 'none') { 
				var newDown = $(element).position().top + 1;
				$(element).css('top', newDown + 'px');
				setContextPaletteSizeInputValues();
			}
		}
		
		// Moves the selected element(s) a pixel left per click.
		function moveElementLeft(element) {
			if ($('.contextPalette').css('display') != 'none') { 
				var newLeft = $(element).position().left - 1;
				$(element).css('left', newLeft + 'px');
				setContextPaletteSizeInputValues();
			}
		}
		
		// Method for detecting directional arrow buttons that have been clicked. These control the position of the ad elements.
		window.addEventListener('keydown', function(e) {
			moveCandidateElement = document.getElementById(String($scope.currentAdAssetId));
			
			if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
				switch (e.keyCode) {
					case 38 :
						moveElementUp(moveCandidateElement);
						break;
					case 39 :
						moveElementRight(moveCandidateElement);
						break;
					case 40 :
						moveElementDown(moveCandidateElement);
						break;
					case 37 :
						moveElementLeft(moveCandidateElement);
						break;
				}
			}
		}, false);
		
		// This method changes the position input fields on the context palette when the direction arrow buttons 
		// are clicked or when the keyboard arrow buttons are clicked.
		function setContextPaletteSizeInputValues() {
			var currentAdAsset = $('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]');

			switch ($scope.currentAdAssetType) {
				case 'text' :
					$('#textAssetX').val(String($(currentAdAsset).position().left));
					$('#textAssetY').val(String($(currentAdAsset).position().top));
					break;
				case 'button' :
					$('#buttonAssetX').val(String($(currentAdAsset).position().left));
					$('#buttonAssetY').val(String($(currentAdAsset).position().top));
					break;	
				case 'image' :
					$('#imageAssetX').val(String($(currentAdAsset).position().left));
					$('#imageAssetY').val(String($(currentAdAsset).position().top));
					break;
				case 'video' :
					//
					break;
				case 'gallery' :
					//
					break;
				case 'carouselImage' :
					//
					break;
				case 'symbol' :
					//
					break;
				case 'logoImage' :
					$('#logoAssetX').val(String($(currentAdAsset).position().left));
					$('#logoAssetY').val(String($(currentAdAsset).position().top));
					break;						
				default :
					//
					break;	
			}
		}

  });

