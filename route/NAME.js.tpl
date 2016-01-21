(function(angular) {
'use strict';

angular.module('APP')
    .config(function ($stateProvider) {
	$stateProvider
	    .state('STATE', {
		url: 'URL',
		templateUrl: 'PATH/NAME.html',
		controller: 'DASH2PASCAL(NAME)Controller',
		controllerAs:'vm'	
	    })
    });
})(angular);
