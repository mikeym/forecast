'use strict';

describe('TinyApp HomeController tests', function() {
    var ctrl,
        scope,
        elem;

    beforeEach(module('TinyApp'));
    beforeEach(inject(function($controller, $rootScope, $document, $compile) {
        scope = $rootScope.$new();

        // Create a tiny document with an element that includes our controller compiled into scope
        elem = angular.element(
            '<div ng-controller="HomeController as hc"></div>'
        );
        $document.find('body').empty();
        $document.find('body').append(elem);

        ctrl = $controller('HomeController as hc', {
            $scope: scope
        });
        $compile(elem)(scope);
        scope.$digest();
    }));

    it('should have an appBlurb property with the expected value', function() {
        expect(ctrl.appBlurb).toBeDefined();
        expect(ctrl.appBlurb).toMatch(/Tiny Angular Starter Project/);
    });

});