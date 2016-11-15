'use strict';

angular.module('gepettoApp')
  .controller('NewadCtrl', function ($scope) {
	  
	var adCreationState = 'new';
	var userMessage = false;
	var currentMessageFunctions = new Array();
	  
	// Suppress standard browser right click context menu for better UX.  
	$('.newAdMasthead, .newAdSideSectionContainer, .newAdElement, .adPaletteContainer').bind('contextmenu', function(e) {
		e.preventDefault();
	});
	
	// Close specific subsections on initial load.
	$scope.defaultSubSectionDisplay = function () {
		$('#adAssets, #adAlignment, #adLayers').find('.subSectionContent').css('display','none');	
	};
	
	$scope.defaultSubSectionDisplay();
	  
	var currentWindowHeight = $(window).height();
	
	$('.newAdSideSectionContainer, .adPaletteContainer').css('min-height',currentWindowHeight - 42).css('height',currentWindowHeight - 42);	
	
	/*
	<div class="stdTick"></div>
	<div class="stdTick"></div>
	<div class="stdTick"></div>
	<div class="stdTick"></div>
	<div class="keyTick">
		<div class="topRuleLabel">0</div>
	</div>
	*/	
	
	// Construct top horizontal ruler.
	var horizontalRulerObject = '<div class="primaryTick"></div>';
	var rulerLabel = 0;
	
	for (var i = 0; i < 2; i++) {
		horizontalRulerObject += '<div class="stdTick"></div>';
	}
	horizontalRulerObject += '<div class="keyTick"><div class="topRuleLabel">0</div></div>';
	
	for (var i = 1; i < 180; i++) {
		horizontalRulerObject += '<div class="stdTick"></div>';
		if (i % 9 === 0) {
			horizontalRulerObject += '<div class="keyTick"><div class="topRuleLabel">' + (rulerLabel += 100) + '</div></div>';
		}
	}
	
	// Add horizontal ruler to the display list.
	$('.topHorizontalRule').append(horizontalRulerObject);
	
	// Construct left vartical ruler.
	var leftRulerObject = '<div class="primaryTick"></div>';
	var rulerLabel = 0;
	
	for (var i = 0; i < 2; i++) {
		leftRulerObject += '<div class="stdTick"></div>';
	}
	leftRulerObject += '<div class="keyTick"><div class="leftRuleLabel">0</div></div>';
	
	for (var i = 1; i < 100; i++) {
		leftRulerObject += '<div class="stdTick"></div>';
		if (i % 9 === 0) {
			leftRulerObject += '<div class="keyTick"><div class="leftRuleLabel">' + (rulerLabel += 100) + '</div></div>';
		}
	}

	// Add vertical ruler to the display list.
	$('.leftVerticalRule').append(leftRulerObject);
	
	// Opens/closes the left side section containers.
	$('.subHeader').click(function() {
		$(this).next('.subSectionContent').slideToggle('fast', function() {
			// Animation complete.
		});
	});
	
	// Opens ou a user message letting them know that they are about to add a new ad size.
	$('#addNewSize').click(function() {
		userMessage = true;
		currentMessageFunctions = new Array();
		currentMessageFunctions.push({'yesFunction':null,'noFunction':null,'yesAfterFunction':closeModal});
		initiateAppUserMessage($scope.loc[0].NEW_AD_ADD_NEW_SIZE,'none');
	});
	
	// Method for user messaging.
	function initiateAppUserMessage(message,buttonDisplay) {
		$('#userMessage').html(message);
		$('.messageButtonContainer').css('display',buttonDisplay);
		$('#newAdOverlay, #overlayMessage, .btnModalClose').fadeIn('fast');
	
		var overlayContainer = document.getElementById('overlay');
		var boxContainer = document.getElementById('overlayMessage');
	
		var containerTopMargin = ($(window).height() - boxContainer.offsetHeight) / 2;
		var containerLeftMargin = ($(window).width() - boxContainer.offsetWidth) / 2;
		var boxContainerWidth = $(boxContainer).css('width').substring(0,$(boxContainer).css('width').length - 2);
		var scrollPos = $(window).scrollTop();
	
		$('#overlayMessage').css('top',containerTopMargin + scrollPos).css('left',containerLeftMargin);
		$('.btnModalClose').css('top',((containerTopMargin + scrollPos) - 15)).css('left',((parseInt(containerLeftMargin) + parseInt(boxContainerWidth)) + 15));
	}
	
	// Handler for when the modal window close button is clicked.
	$('.btnModalClose').click(function() {
		closeModal();
	});
	
	// Closes the modal overlay screen and message window.
	function closeModal() {	
		if (userMessage == true) {
			$('#newAdOverlay, #overlayMessage, .btnModalClose').css('display','none');
			userMessage = false;
		}
	}
	
	// The button hover handler - adds/removes a white glow around the button.
	$('.newAdBtn').hover(function() {
		$(this).toggleClass('glow');
	});

  });
