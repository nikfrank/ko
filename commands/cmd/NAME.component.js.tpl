(function(angular){
  'use strict';

  angular.module('APP')
    .component('DASH2CAMEL(NAME)', {
      templateUrl: 'PATH/NAME.html',
      bindings:{},
      controller: 'DASH2PASCAL(NAME)Controller',
      controllerAs: 'vm'
    });
})(angular);
