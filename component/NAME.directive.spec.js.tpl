'use strict';

describe('Directive: DASH2CAMEL(NAME)', function () {

  // load the directive's module and view
  beforeEach(module('APP'));
  beforeEach(module('PLACE/NAME.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<NAME></NAME>');
    element = $compile(element)(scope);
    scope.$apply();
//    expect(element.text()).toBe('this is the DASH2CAMEL(NAME) directive');
  }));
});
