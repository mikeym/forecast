'use strict';

describe('ForecastApp main app configuration tests', function() {
    var route;
    
    beforeEach(module('ForecastApp'));
    beforeEach(inject(function($route) {
        route = $route;
    }));

    it('should have the correct route values for the home view', function() {
        expect(route.routes['/home']).not.toBeNull();
        expect(route.routes['/home'].controller).toEqual('HomeController');
        expect(route.routes['/home'].controllerAs).toEqual('hc');
        expect(route.routes['/home'].templateUrl).toEqual('components/home/home-view.html')
    });

});
