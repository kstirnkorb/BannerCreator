'use strict';

angular.module('gepettoApp')
  .controller('AppresizeCtrl', function ($scope) {

	// Handler for when the browser view port is resized in any way.
	$(window).resize(function(){
		waitForFinalEvent(function(){
			var leftContainerWidth = $('#leftContainer').css('width');
			var currentWindowWidth = $(window).width();
			var currentWindowHeight = $(window).height();
			
			$('#mainContainer').css('min-width',currentWindowWidth).css('min-height',currentWindowHeight);
			$('#leftContainer, #rightContainer').css('min-height',currentWindowHeight - 42).css('height',currentWindowHeight - 42);
			$('#rightContainer').css('width',((currentWindowWidth - parseInt(leftContainerWidth))));
			$('.newAdSideSectionContainer, .adPaletteContainer, .newAdElementContainer').css('min-height',currentWindowHeight + 42).css('height',currentWindowHeight - 42);	
			
			$('.contextPalette').draggable('destroy');
			$('.contextPalette').css('display','none');
			
		}, 250, 'Some unique string...');
	});
	
	// Variable and method used as a helper to insure that a chart is resized only after the resize event has ended.
	var waitForFinalEvent = (function() {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = 'Don\'t call this twice without a uniqueId...';
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

  });
