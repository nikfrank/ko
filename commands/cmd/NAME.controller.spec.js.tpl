'use strict';

describe('Controller: DASH2PASCAL(NAME)Controller', function () {

  // load the controller's module
  beforeEach(module('APP'));

  var Controller, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Controller = $controller('DASH2PASCAL(NAME)Controller', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
