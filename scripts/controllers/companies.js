'use strict';

angular.module('gepettoApp')
  .controller('CompaniesCtrl', function ($scope, Companyservice) {
	  
	var newData = [];

	// Reads in the list of companies for display in the UI.  
   	Companyservice.query(function(data){
		data.forEach(function(obj) {
			if (parseInt(obj.value) > 0) {
				newData.push(obj);
			}
		});
   		$scope.companies = newData;
  	});

  });
