'use strict';

angular.module('gepettoApp')
  .service('LocalizationService', function LocalizationService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	return $resource('json/localization/dictionary_EN.json');
  });
