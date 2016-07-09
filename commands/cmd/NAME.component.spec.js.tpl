'use strict';

describe('Component: DASH2CAMEL(NAME)', function () {

  // load the directive's module and view
  beforeEach(module('APP'));
  beforeEach(module('PATH/NAME.html'));
  beforeEach(module('ngMock'));

  var component, $componentController, scope;

  beforeEach(inject(function($rootScope, _$componentController_) {
    scope = $rootScope.$new();
    $componentController = _$componentController_;
  }));




  it('should make hidden element visible', inject(function ($compile) {
    let component = $componentController('DASH2CAMEL(NAME)', {
      // locals
      $scope: scope
    }, {

      // bindings 
      bindExample: {
        afterFormSubmit: jasmine.createSpy('formSubmit')
      }
    });

    //    we can check also that the spy was run, if eg, a button was pressed
    //    expect(element.text()).toBe('this is the tssCreateProjectPage component');
  }));
});
