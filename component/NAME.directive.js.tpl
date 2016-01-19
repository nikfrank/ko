(function(angular){
'use strict';

angular.module('APP')
  .directive('DASH2CAMEL(NAME)', function () {
      return {
	  templateUrl: 'PLACE/NAME.html',
	  restrict: 'EA',
	  scope: {},
	  bindToController:{},
	  controller: 'DASH2PASCAL(NAME)Controller',
	  controllerAs: 'vm'
      }
  });
})(angular);
