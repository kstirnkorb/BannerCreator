'use strict';

angular.module('gepettoApp')
  .controller('EdittextCtrl', function ($scope) {
	  
	var parentElement = document.getElementById(String($scope.currentAdAssetId));
	var childElement;	
	var cssPropsString = '';
	var assetProps = [];
	
	$scope.textAssetSizeDefault = '10';
	$scope.textAssetLayerDefault = String($(parentElement).css('z-index'));
	$scope.textAssetLetterSpacingDefault = '0.00';
	$scope.textAssetLineHeightDefault = '1.25';
	$scope.textAssetIndentDefault = '0.00';
	$scope.textAssetTextDefault = '';  
	$scope.textAssetURLDefault = '';
	$scope.textAssetColorDefault = '#FFFFFF';
	$scope.textAssetAlphaDefault = '1.00';

	/*
	opacity:0.0;
	filter:alpha(opacity=0);
	*/
	
	// Visibly shows a user that the size link has been turned on or off.
	$('.sizeLink').click(function() {
		$(this).toggleClass('sizeLinkActive');
		setPropertyValues();
	});
	
	// Click handler for the trash icon button. Removes the currently active text ad element.  
	$('.iconTrash').click(function() {
		$('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]').remove();
		$('.contextPalette').fadeOut('fast');
		
		// We need to use Angular to reach into the ad assets scope and set the variable that 
		// lets that controller know that the context palette has been closed.
		angular.element(document.getElementById('newAdWrapper')).scope().contextPaletteActive = false;
		
		$('#textAssetFont').prop('selectedIndex', 0);
		$('#textAssetSize').val('10');
		$('#textAssetLayer').val('1');
		$('#textAssetLetterSpacing').val('0.00');
		$('#textAssetLineHeight').val('1.25');
		$('#textAssetIndent').val('0.00');
		$('#textAssetText').val('');
		$('#textAssetURL').val('');
		$('.colorPicker').colorpicker({color:'#ffffff'});
		$('#textAssetColor').val('#FFFFFF');
		
		// Remove object from the scope ad asset array (adassets.js).
		for (var i = 0; i < $scope.currentAdAssets.length; i++) {
			if ($scope.currentAdAssets[i].id === $scope.currentAdAssetId) {
				$scope.currentAdAssets.splice(i,1);	
			}
		}
	});
	
	// Handler method for when the image asset value is changed. Sets the necessary ad element properties 
	// both on the DOM and then also in the scoped asset property object.
	$scope.textAssetChange = function() {
		parentElement = document.getElementById(String($scope.currentAdAssetId));
		
		$(parentElement).css('width',$('#textAssetWidth').val() + 'px');
		$(parentElement).css('height',$('#textAssetHeight').val() + 'px');
		$(parentElement).css('left',$('#textAssetX').val() + 'px');
		$(parentElement).css('top',$('#textAssetY').val() + 'px');
		$(parentElement).css('z-index',$('#textAssetLayer').val());

		cssPropsString + 'width:' + $('#textAssetWidth').val() + 'px;';
		cssPropsString += 'height:' + $('#textAssetHeight').val() + 'px;';
		cssPropsString += 'left:' + $('#textAssetX').val() + 'px;';
		cssPropsString += 'top:' + $('#textAssetY').val() + 'px;';
		cssPropsString += 'font-family:' + $('#textAssetFont').find(':selected').text() + ';';
		cssPropsString += 'font-size:' + $('#textAssetSize').val() + 'px;';
		cssPropsString += 'z-index:' + $('#textAssetLayer').val() + ';';
		cssPropsString += 'letter-spacing:' + $('#textAssetLetterSpacing').val() + 'em;';
		cssPropsString += 'line-height:' + $('#textAssetLineHeight').val() + 'em;';
		cssPropsString += 'text-indent:' + $('#textAssetIndent').val() + 'em;';
		cssPropsString += 'text-align:' + $('#textAssetAlignment').find(":selected").text() + ';';
		cssPropsString += 'color:' + $('#textAssetColor').val() + ';';

		assetProps = [
						{'width':$('#textAssetWidth').val() + 'px'},
						{'height':$('#textAssetHeight').val() + 'px'},
						{'left':$('#textAssetX').val() + 'px'},
						{'top':$('#textAssetY').val() + 'px'},
						{'font-family':$('#textAssetFont').find(':selected').text()},
						{'font-size':$('#textAssetSize').val() + 'px'},
						{'z-index':$('#textAssetLayer').val()},
						{'letter-spacing':$('#textAssetLetterSpacing').val() + 'em'},
						{'line-height':$('#textAssetLineHeight').val() + 'em'},
						{'text-indent':$('#textAssetIndent').val() + 'em'},
						{'text-align':$('#textAssetAlignment').find(':selected').text()},
						{'color':$('#textAssetColor').val()},
						{'text':$('#textAssetText').val()},
						{'url':$('#textAssetURL').val()}
					];
					
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				obj.props = assetProps;	
			}
		});
		
		// Remove border from placeholder container.
		//$(parentElement).css('border','none');

		// Check to see if the original placeholder element is present. If so remove it
		// and replace it with final DOM element. If the child element exists then
		// set the appropriate property.
		if ($(parentElement).find('svg').length > 0) {
			$(parentElement).find('svg').remove();
			var childDOMElement = '<div id="' + String($scope.currentAdAssetId) + '_child" style="' + cssPropsString + '">' + $('#textAssetText').val() + '</div>';

			$(childDOMElement).appendTo(parentElement);	
		} else if ($(parentElement).find('div').length > 0) {
			childElement = $(parentElement).find("[id='" + String($scope.currentAdAssetId) + '_child' + "']");
			$(childElement).removeAttr('style').attr('style',cssPropsString);
			$(childElement).text($('#textAssetText').val());
		}		
	};
	
	// Input DOM element change handler for the text ad element.
	$('#textAssetWidth, #textAssetHeight, #textAssetX, #textAssetY, #textAssetSize, #textAssetLayer, #textAssetLetterSpacing, #textAssetLineHeight, #textAssetIndent, #textAssetColor').on('input', function() {
		$scope.textAssetChange();
	});
	
	// Drop down DOM element change handler for the text ad element.
	$('#textAssetFont, #textAssetAlignment, #textAssetColor').change(function() {
		$scope.textAssetChange();
	});

  });
