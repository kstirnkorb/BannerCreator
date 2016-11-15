'use strict';

angular.module('gepettoApp')
  .service('Companyservice', function Companyservice($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	// Server: /companies/api/?agg=Y
	// Local: json/companies.json

	return $resource('json/companies.json');
  });
