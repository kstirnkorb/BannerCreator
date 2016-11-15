'use strict';

angular.module('gepettoApp')
  .controller('MainCtrl', function ($scope) {

	var adDataSource = "json/ads.json";
	
	// SERVICE CALL: Retrieve companies.
	$.getJSON(adDataSource, function(data) {
		if (data) {
			// Construct the ad containers and their elements and then add to the display list.
				
			/*
			<div id="1" class="adContainerWrapper" style="width:730px; height:106px; left:0px; top:0px;">
				<div class="adContainer" id="adContainer728X90">
					<div id="728X90_headline_text" class="adElement">SAVE BIG</div>
					<div id="728X90_subhead_text" class="adElement">On orders over $50</div>
					<div id="728X90_cat_text" class="adElement">You'll love the selection!</div>
					<div id="728X90_prod_text" class="adElement">All items</div>
					<div id="728X90_promo_text" class="adElement">Many selections</div>
					<div id="728X90_details_text" class="adElement">See Details*</div>
					<div id="728X90_cta_text" class="adElement">Shop Now</div>
					<div id="728X90_price_text" class="adElement">$100.00</div>
					<div id="728X90_sale_price_text" class="adElement">Now only $80.00</div>
					<div id="728X90_countdown_text" class="adElement">5 DAYS LEFT</div>
					<div id="728X90_review_text" class="adElement">(6 REVIEWS)</div>
					<div id="728X90_adChoices" class="adChoices"></div>
				</div>
				<div class="sizeLock">728x90</div>
			</div>
			*/
		
			var adElements = "";
			var adContainerObject;
			var adSize;
			var elementStyle = "";
			var visibleSetting = "display:inline-block;"
		
			for (var i = 0; i < data.length; i++) {
				
				adSize = data[i].adSize;
				adElements = "";
				
				data[i].adElements.forEach(function(obj) {
					
					elementStyle = "";
					
					for (var prop in obj.config) {
						if (obj.active === false) {
							visibleSetting = "display:none;"
						} else {
							visibleSetting = "display:inline-block;"
						}
						elementStyle += prop.substr(1,prop.length) + ':' + obj.config[prop] + ';';
					}
					
					if (obj.active === true) {
						adElements += '<div id="' + adSize + '_' + obj.name + '" class="adElement" style="' + elementStyle + visibleSetting + '">' + obj.value + '</div>';
					}
				});
		
				adContainerObject = $('<div id="' + data[i].id + '"  class="adContainerWrapper" ' +
						'style="width:' + (data[i].adSizeWidth + 12) + 'px; height:' + (data[i].adSizeHeight + 16) + 'px; ' +
						'left:' + data[i].layoutXPos + 'px; top:' + data[i].layoutYPos + 'px;">' +
						'<div class="adContainer" id="adContainer' + adSize + '" style="' + data[i].backgroundColor + '">' +
						adElements + 
						'<div id="' + adSize + '_adChoices" class="adChoices"></div>' +
					'</div>' +
					'<div class="sizeLock">' + data[i].adSize + '</div>' +
				'</div>');
				
				$('#adContainer').append(adContainerObject);	
			}			
		}
	});	
	
  });
