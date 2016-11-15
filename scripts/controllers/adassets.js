'use strict';

angular.module('gepettoApp')
  .controller('AdassetsCtrl', function ($scope) {
	
	var currentLeftPos = '0px';
	var currentTopPos = '0px';  
	var adAssetId = 0;
	var assetType = '';
	var assetTypeName = $scope.loc[0].NEW_AD_TAB_ELEMENT;
	
	var newAdElementHexColor;
	var r;
	var g;
	var b;	
	var rgb;
	var colorValue;
	var svgStrokeValue;
	var brightnessFactor;
	var svgContainerBorderSetting;
	var typeName;
	
	$scope.currentAdAssets = [];
	$scope.currentAdAssetId;
	$scope.currentAdAssetType;
	$scope.contextPaletteActive = false;
	
	$scope.elementViewTemplates = [
		{type:'button',url:'views/subviews/editButton.html'},
		{type:'carouselImage',url:'views/subviews/editCarousel.html'},
		{type:'gallery',url:'views/subviews/editGallery.html'},
		{type:'image',url:'views/subviews/editImage.html'},
		{type:'logoImage',url:'views/subviews/editLogo.html'},
		{type:'symbol',url:'views/subviews/editSymbol.html'},
		{type:'text',url:'views/subviews/editText.html'},
		{type:'video',url:'views/subviews/editVideo.html'}
	];
	$scope.elementViewTemplate = $scope.elementViewTemplates[6].url;

	//  Adds a new object to the DOM and the current ad container.
	$('.newAdAsset').click(function() {
		// Add asset only if an ad element container is visible.
		if ($('.newAdElement').css('opacity') > 0) {
			// First close the edit palette if it is open.
			$('.contextPalette, .bottomContent').css('display','none');
			$('.contextPalette').find('.tabActive').removeClass('tabActive').addClass('tab');	
			$('.contextPalette').find('.tab').first().addClass('tabActive');	
			$('#assetEditElement').css('display','block');
			
			// Find out how many assets exist currently to calculate a unique id.
			adAssetId = $('.newAdElement').children().length;
			
			typeName = $(this).attr('class').split('newAdAsset ').join('');
			
			// Add ad asset info to array for persistence.		
			$scope.currentAdAssets.push({'id':parseInt(adAssetId),
								'type':typeName,
								'name':'',
								'description':'',
								'props':[],
								'status':'active'
							});
			
			createSVGAsset(parseInt(adAssetId),typeName);
		}
	});
	
	// Initial method for drawing the ad asset placeholder "X". Also establishes draggability
	// and resizability. Calls method for setting default values on the context palette.
	function createSVGAsset(id, type) {
		// Use either a dark or light treatment on the text and lines of the ad assets based
		// on the brightness of the ad background color.
		newAdElementHexColor = $('#adColor').val();
		r = parseInt((cutHex(newAdElementHexColor)).substring(0,2),16);
		g = parseInt((cutHex(newAdElementHexColor)).substring(2,4),16);
		b = parseInt((cutHex(newAdElementHexColor)).substring(4,6),16);	
		rgb = new Array(r, g, b);
		brightnessFactor = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
		
		if (brightnessFactor > 125) {
			colorValue = '#000000';
			svgStrokeValue = 'stroke:rgb(51,51,51);stroke-width:1';
			svgContainerBorderSetting = '1px solid #333333';
		} else { 
			colorValue = '#FFFFFF';
			svgStrokeValue = 'stroke:rgb(204,204,204);stroke-width:1';
			svgContainerBorderSetting = '1px solid #CCCCCC';
		}
		
		typeName = type;
		
		if (typeName === 'logoImage') {
			typeName = 'logo';
		} else if (typeName === 'carouselImage') {
			typeName = 'carousel';
		}
		
		var svgPlaceholderElement = '<div id="' + id + '" data-type="' + type.toUpperCase() + '" class="svgPlaceholder" style="z-index:' + (adAssetId + 1) + '"><svg>' + 
				'<text x="2" y="8" fill="' + colorValue + '" font-size="8" font-family="sans-serif">' + typeName.toUpperCase() + '</text>' +
				'<line x1="0" y1="0" x2="50" y2="50" style="' + svgStrokeValue + '" />' +
				'<line x1="0" y1="50" x2="50" y2="0" style="' + svgStrokeValue + '" />' +
				'<line x1="0" y1="0" x2="0" y2="50" style="' + svgStrokeValue + '" />' +
				'<line x1="0" y1="0" x2="50" y2="0" style="' + svgStrokeValue + '" />' +
				'<line x1="0" y1="50" x2="50" y2="50" style="' + svgStrokeValue + '" />' +
				'<line x1="50" y1="50" x2="50" y2="0" style="' + svgStrokeValue + '" />' +
			'</svg></div>';
			
		$(svgPlaceholderElement).appendTo('.newAdElement');
		
		var svgElement = document.getElementById(String(id));
		
		$(svgElement).css('left',(($('.newAdElement').width() - 50) / 2));
		$(svgElement).css('top',(($('.newAdElement').height() - 50) / 2));

		// Intitialize draggable functionality for ad asset.
		$(svgElement).draggable({
			containment: '.newAdElementContainer',
			drag: svgPlaceholderDragLive,
			stop: svgPlaceholderDragStop,
			cursor: 'move'
		});

		// Intitialize resizable functionality for ad asset.
		$(svgElement).resizable({
			containment: '.newAdElementContainer',
			start: svgPlaceholderResizeStart,
			stop: svgPlaceholderResizeStop
		});

		// Handler for when a user right clicks an asset. This brings up the context palette that 
		// is associated with that particular asset.
		$(svgElement).bind('contextmenu', function(e) {
			e.preventDefault();
			
			$scope.currentAdAssetId = id;
			$scope.contextPaletteActive = true;
			
			// Determine which type of ad asset we are dealing with.
			assetType = '';
			assetTypeName = $scope.loc[0].NEW_AD_TAB_ELEMENT;
			
			$scope.currentAdAssets.forEach(function(obj) {
				if (obj.id === id) {
					assetType = obj.type;	
				}
			});
			
			// Set the proper edit template for this asset.
			$scope.elementViewTemplates.forEach(function(obj) {
				if (obj.type === assetType) {
					$scope.elementViewTemplate = obj.url;
					$scope.$apply();	
				}
			});
			
			var currentWindowWidth = $(window).width() / 2;
			var currentWindowHeight = $(window).height() / 2;

			$('.contextPalette').css('left',currentWindowWidth - ($('.contextPalette').width() / 2));
			$('.contextPalette').css('top',currentWindowHeight - ($('.contextPalette').height() / 2));
			$('.contextPalette').fadeIn('fast', function() {
				setDefaultValues();
			});

			$(svgElement).resizable('destroy');

			var x2 = $(window).width() - $('.contextPalette').width() - 25;
			var y2 = $('.adPaletteContainer').height() - $('.contextPalette').height();
			
			// Intitialize draggable functionality for all modules.
			$('.contextPalette').draggable({
				handle: '.dragPad',
				containment: [0,0,x2,y2],
				cursor: 'move',
				grid: [2,2]
			});
		});
		
		// Here is where we call the Angular-scoped method that reports the 
		// current layer settings of the ad elements.
		var adLayerElement = document.getElementById('adLayers');
		$(adLayerElement).scope().processAdLayers();
	}
	
	// Handler method for when an ad asset has just started resizing.
	function svgPlaceholderResizeStart() {
		currentLeftPos = $(this).css('left');
		currentTopPos = $(this).css('top');
		$(this).css('left',currentLeftPos);
		$(this).css('top',currentTopPos);
		$(this).find('svg').remove();
		
		adAssetId = parseInt($(this).attr('id'));
		
	}
	
	// Handler method for when an ad asset has just stopped resizing.
	function svgPlaceholderResizeStop() {
		var propsSetStatus = false;

		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === adAssetId) {
				if (obj.props.length > 0) {
					propsSetStatus = true;
				}
			}
		});		
		
		// Repaint the svg "X".
		if (propsSetStatus === false) {
			var containerWidth = parseInt($(this).width());
			var containerHeight = parseInt($(this).height());

			var svgPlaceholderSubElement = '<svg>' + 
					'<text x="2" y="8" fill="' + colorValue + '" font-size="8" font-family="sans-serif">' + typeName.toUpperCase() + '</text>' +
					'<line x1="0" y1="0" x2="' + containerWidth + '" y2="' + containerHeight + '" style="' + svgStrokeValue + '" />' +
					'<line x1="0" y1="' + containerHeight + '" x2="' + containerWidth + '" y2="0" style="' + svgStrokeValue + '" />' +
					'<line x1="0" y1="0" x2="0" y2="' + containerHeight + '" style="' + svgStrokeValue + '" />' +
					'<line x1="0" y1="0" x2="' + containerWidth + '" y2="0" style="' + svgStrokeValue + '" />' +
					'<line x1="0" y1="' + containerHeight + '" x2="' + containerWidth + '" y2="' + containerHeight + '" style="' + svgStrokeValue + '" />' +
					'<line x1="' + containerWidth + '" y1="' + containerWidth + '" x2="' + containerWidth + '" y2="0" style="' + svgStrokeValue + '" />' +
				'</svg>';
				
			$(svgPlaceholderSubElement).appendTo(this);
			
			var svgElement = document.getElementById($(this).attr('id'));

			$(svgElement).css('left',currentLeftPos);
			$(svgElement).css('top',currentTopPos);
			
			// Intitialize resizable functionality for ad asset.
			$(this).resizable({
				containment: '.newAdElementContainer',
				start: svgPlaceholderResizeStart,
				stop: svgPlaceholderResizeStop
			});
		}
		
		var currentAdAsset = $('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]');
		var assetProps;
		
		// Set values in asset array.
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				assetProps = obj.props;	
			}
		});
		
		for (var key in assetProps) {
			var val = assetProps[key];
			switch (key) {
				case 'width':	
					val = String($(currentAdAsset).width()) + 'px';
					break;
				case 'height':	
					val = String($(currentAdAsset).height()) + 'px';
					break;
				case 'left':	
					val = String($(currentAdAsset).position().left) + 'px';
					break;
				case 'top':	
					val = String($(currentAdAsset).position().top) + 'px';
					break;			
			}
		}
		
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === $scope.currentAdAssetId) {
				obj.props = assetProps;	
			}
		});
	}

	// When the asset is dragged change the values on the context palette immediately if it is displayed.
	function svgPlaceholderDragLive() {
		if ($scope.contextPaletteActive === true) {
			var currentAdAsset = $('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]');
			
			switch (assetType) {
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
	}
	
	// Set values in asset array after an asset has stopped being dragged.
	function svgPlaceholderDragStop() {
		var currentAdAsset = $('.newAdElement').find('div[id="' + String(adAssetId) + '"]');
		var assetProps;
		
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === adAssetId) {
				assetProps = obj.props;	
			}
		});
		
		for (var key in assetProps) {
			var val = assetProps[key];
			switch (key) {
				case 'width':	
					val = String($(currentAdAsset).width()) + 'px';
					break;
				case 'height':	
					val = String($(currentAdAsset).height()) + 'px';
					break;
				case 'left':	
					val = String($(currentAdAsset).position().left) + 'px';
					break;
				case 'top':	
					val = String($(currentAdAsset).position().top) + 'px';
					break;			
			}
		}
		
		$scope.currentAdAssets.forEach(function(obj) {
			if (obj.id === adAssetId) {
				obj.props = assetProps;	
			}
		});
	}
	
	// When the context palette is opened we need to set the default values or the ones that are already
	// set for the asset the context palette is called upon. Sets the proper tab name.
	function setDefaultValues() {
		var currentAdAsset = $('.newAdElement').find('div[id="' + String($scope.currentAdAssetId) + '"]');

		switch (assetType) {
			case 'text' :
			
				$('#textAssetLayer').val($(currentAdAsset).css('z-index'));
				
				$('.colorTypeBtn').css('background-position','0px -16px');
				$('#textAssetWidth').val(String($(currentAdAsset).width()));
				$('#textAssetHeight').val(String($(currentAdAsset).height()));
				$('#textAssetX').val(String($(currentAdAsset).position().left));
				$('#textAssetY').val(String($(currentAdAsset).position().top));
				$('.colorPicker').colorpicker('show');	
				$scope.currentAdAssets.forEach(function(obj) {
					if (obj.id === $scope.currentAdAssetId) {
						/*
						obj.props.forEach(function(prop) {
							$('#textAssetFont option:contains(' + prop['font-family'] + ')').attr('selected', 'selected');
							$('#textAssetAlignment option:contains(' + prop['text-align'] + ')').attr('selected', 'selected');
						});
						*/
						obj.props.forEach(function(prop) {
							for (var key in prop) {
								var val = prop[key];
								switch (key) {
									case 'font-family' :
										$('#textAssetFont option').filter(function() {
											return this.text == val; 
										}).attr('selected', true);
										break;
									case 'font-size' :
										$('#textAssetSize').val(val.split('px').join(''));
										break;
									case 'z-index' :
										$('#textAssetLayer').val(val);
										break;
									case 'letter-spacing' :
										$('#textAssetLetterSpacing').val(val.split('em').join(''));
										break;
									case 'line-height' :
										$('#textAssetLineHeight').val(val.split('em').join(''));
										break;	
									case 'text-indent' :
										$('#textAssetIndent').val(val.split('em').join(''));
										break;
									case 'text-align' :
										$('#textAssetAlignment option').filter(function() {
											return this.text == val; 
										}).attr('selected', true);
										break;
									case 'color' :
										$('#textAssetColor').val(val);
										$('.colorPicker').colorpicker({color:val});
										break;
									case 'text' :
										$('#textAssetText').val(val);
										break;	
									case 'url' :
										$('#textAssetURL').val(val);
										break;												
								}
							}
						});
					}
				});
				
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_TEXT;
				break;
			case 'button' :
			
				$('#buttonAssetLayer').val($(currentAdAsset).css('z-index'));
			
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				$('#buttonAssetWidth').val(String($(currentAdAsset).width()));
				$('#buttonAssetHeight').val(String($(currentAdAsset).height()));
				$('#buttonAssetX').val(String($(currentAdAsset).position().left));
				$('#buttonAssetY').val(String($(currentAdAsset).position().top));
				$scope.currentAdAssets.forEach(function(obj) {
					if (obj.id === $scope.currentAdAssetId) {
						obj.props.forEach(function(prop) {
							for (var key in prop) {
								var val = prop[key];
								switch (key) {
									case 'z-index' :
										$('#buttonAssetLayer').val(val);
										break;
									case 'imageURL' :
										$('#buttonAssetImage option').filter(function() {
											return this.text == val; 
										}).attr('selected', true);
										$('.imageAssetThumb').css('background-image','url(../' + val + ')');
										$('#buttonActualImageAssetThumb').attr('src','../' + val);
										break;												
								}
							}
						});
					}
				});
								
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_BUTTON;
				break;	
			case 'image' :
				
				$('#imageAssetLayer').val($(currentAdAsset).css('z-index'));
			
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				$('#imageAssetWidth').val(String($(currentAdAsset).width()));
				$('#imageAssetHeight').val(String($(currentAdAsset).height()));
				$('#imageAssetX').val(String($(currentAdAsset).position().left));
				$('#imageAssetY').val(String($(currentAdAsset).position().top));
				$scope.currentAdAssets.forEach(function(obj) {
					if (obj.id === $scope.currentAdAssetId) {
						obj.props.forEach(function(prop) {
							for (var key in prop) {
								var val = prop[key];
								switch (key) {
									case 'z-index' :
										$('#imageAssetLayer').val(val);
										break;
									case 'imageURL' :
										$('#imageAssetImage option').filter(function() {
											return this.text == val; 
										}).attr('selected', true);
										$('.imageAssetThumb').css('background-image','url(../' + val + ')');
										$('#imageActualImageAssetThumb').attr('src','../' + val);
										break;												
								}
							}
						});
					}
				});
				
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_IMAGE;
				break;
			case 'video' :
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_VIDEO;
				break;
			case 'gallery' :
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_GALLERY;
				break;
			case 'carouselImage' :
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_CAROUSEL;
				break;
			case 'symbol' :
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_SYMBOL;
				break;
			case 'logoImage' :
				
				$('#logoAssetLayer').val($(currentAdAsset).css('z-index'));
			
				$('.imageScaleBtn').css('background-position','0px -16px');
				$('.imageAssetThumb').css('background-size','contain');
				$('#logoAssetWidth').val(String($(currentAdAsset).width()));
				$('#logoAssetHeight').val(String($(currentAdAsset).height()));
				$('#logoAssetX').val(String($(currentAdAsset).position().left));
				$('#logoAssetY').val(String($(currentAdAsset).position().top));
				$scope.currentAdAssets.forEach(function(obj) {
					if (obj.id === $scope.currentAdAssetId) {
						obj.props.forEach(function(prop) {
							for (var key in prop) {
								var val = prop[key];
								switch (key) {
									case 'z-index' :
										$('#logoAssetLayer').val(val);
										break;
									case 'imageURL' :
										$('#logoAssetImage option').filter(function() {
											return this.text == val; 
										}).attr('selected', true);
										$('.imageAssetThumb').css('background-image','url(../' + val + ')');
										$('#logoActualImageAssetThumb').attr('src','../' + val);
										break;												
								}
							}
						});
					}
				});
				
				assetTypeName = $scope.loc[0].NEW_AD_ASSET_LOGO;
				break;						
			default :
				assetTypeName = $scope.loc[0].NEW_AD_TAB_ELEMENT;
				break;	
		}
		
		$scope.currentAdAssetType = assetTypeName.toLowerCase();
		$('.contextPalette').find('div').first().text(assetTypeName);
	}
	
	// Intitialize resizable functionality for ad asset - called from different controller.
	$scope.resetResizableFunctionality = function() {
		var adAssetElement = document.getElementById(String($scope.currentAdAssetId));
		
		$(adAssetElement).resizable({
			containment: '.newAdElementContainer',
			start: svgPlaceholderResizeStart,
			stop: svgPlaceholderResizeStop
		});
	};
	
	// Removes the pound sign if it is present in a hexidecimal color code.
	function cutHex(h) {
		return (h.charAt(0)=="#") ? h.substring(1,7):h;
	}

  });
