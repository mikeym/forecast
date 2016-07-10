'use strict';

describe('ForecastApp HomeController tests', function() {
    var ctrl,
        scope,
        elem,
        doc,
        forecastService,
        iconService,
        // what the Forecast service sends back when successful
        successfulServiceReturn = {
            daily: [
                {
                    dayOfWeek: 'Sat', icon: 'rain', moonPhase: 0.18, precipIntensity: 0.0099, precipProbabiliy: '55%',
                    summary: 'Light rain in the morning and evening.', temperatureMax: 67, temperatureMin: 57,
                    windBearing: 214, windSpeed: 3
                },
                {
                    dayOfWeek: 'Sun', icon: 'rain', moonPhase: 0.21, precipIntensity: 0.0065, precipProbabiliy: '50%',
                    summary: 'Light rain in the morning and evening.', temperatureMax: 75, temperatureMin: 57,
                    windBearing: 292, windSpeed: 1
                },
                {
                    dayOfWeek: 'Mon', icon: 'partly-cloudy-day', moonPhase: 0.24, precipIntensity: 0.0021, precipProbabiliy: '22%',
                    summary: 'Mostly cloudy throughout the day', temperatureMax: 73, temperatureMin: 56,
                    windBearing: 208, windSpeed: 4
                },
                {
                    dayOfWeek: 'Tue', icon: 'rain', moonPhase: 0.27, precipIntensity: 0.004, precipProbabiliy: '44%',
                    summary: 'Light rain starting in the afternoon', temperatureMax: 75, temperatureMin: 56,
                    windBearing: 236, windSpeed: 2
                },
                {
                    dayOfWeek: 'Wed', icon: 'clear-day', moonPhase: 0.3, precipIntensity: 0.0011, precipProbabiliy: '15%',
                    summary: 'Clear throughout the day.', temperatureMax: 75, temperatureMin: 57,
                    windBearing: 9, windSpeed: 1
                }
            ],
            error: null
        },
        // Create a fake document with an element that includes our controller compiled into scope.
        elem = angular.element(
            '<div id="loading" class="show">loading indicator class starts out as show</div>' +
            '<div ng-controller="HomeController as hc">' +
            '  <section id="fakedatahere" ng-show="hc.massagedData.daily.length && !hc.massagedData.error">' +
            '    <div>Forecast</div>' +
            '  </section>' +
            '  <section id="fakeerrorhere" ng-show="hc.massagedData.error">' +
            '    <div>Error Message</div>' +
            '  </section>' +
            '</div>'
        );

    beforeEach(module('ForecastApp'));
    
    describe('Tests when calls to forecast.io succeed', function() {
        
        beforeEach(inject(function($controller, $rootScope, $document, $compile, ForecastService, $q, IconService) {
            scope = $rootScope.$new();
            forecastService = ForecastService;
            doc = $document;
            iconService = IconService;

            // Mock the two public functions in the ForecastService so we get happy data back
            spyOn(forecastService, 'getDarkSkyForecastData').and.callFake(function() {
                var defer = $q.defer();
                defer.resolve('Sunny skies');
                return defer.promise;
            });
            spyOn(forecastService, 'massageDarkSkyForecastData').and.callFake(function() {
                return successfulServiceReturn;
            });

            // Empty the document and add our element defined above, then compile into scope and digest.
            doc.find('body').empty();
            doc.find('body').append(elem);

            ctrl = $controller('HomeController as hc', {
                ForecastService: forecastService,
                IconService: iconService,
                $document: doc,
                $scope: scope
            });
            $compile(elem)(scope);
            scope.$digest();
        }));

        it('should have a today property with the expected value', function() {
            var momentToday = moment().format('dddd, MMMM D, YYYY');
            expect(ctrl.today).toBeDefined();
            expect(ctrl.today).toEqual(momentToday);
        });

        it('should have expected data in massagedData following a successful service call', function() {
            expect(ctrl.massagedData).toEqual(successfulServiceReturn);
        });

        it('should set Bootstrap hide class on the loading indicator after calling the ForecastService', function() {
            var loadingElem = angular.element(doc[0].getElementById('loading'));
            // note the elem template begins with loading class="show" this should have changed
            expect(loadingElem.hasClass('show')).toBeFalsy();
            expect(loadingElem.hasClass('hidden')).toBeTruthy();
        });

        it('should have a getIconClass function that references IconService.getIconClass', function() {
            expect(ctrl.getIconClass).toBeDefined();
            expect(angular.isFunction(ctrl.getIconClass)).toBeTruthy();
            expect(ctrl.getIconClass).toEqual(iconService.getIconClass);
        });

        it('should have a getMoonClass function that references IconService.getMoonClass', function() {
            expect(ctrl.getMoonClass).toBeDefined();
            expect(angular.isFunction(ctrl.getMoonClass)).toBeTruthy();
            expect(ctrl.getMoonClass).toEqual(iconService.getMoonClass);
        });

        it('should have a getWindBearingClass function that references IconService.getWindBearingClass', function() {
            expect(ctrl.getWindBearingClass).toBeDefined();
            expect(angular.isFunction(ctrl.getWindBearingClass)).toBeTruthy();
            expect(ctrl.getWindBearingClass).toEqual(iconService.getWindBearingClass);
        });

        it('should show the data section of the template when the service calls are successful', function() {
            var dataElem = angular.element(doc[0].getElementById('fakedatahere'));
            // our 'fakedatahere' element includes the visibility test that appears in the forecast section of the template
            expect(dataElem.hasClass('ng-hide')).toBeFalsy();
        });

        it('should hide the error message section of the template when the service calls are successful', function() {
            var dataElem = angular.element(doc[0].getElementById('fakeerrorhere'));
            // our 'fakeerrorhere' element includes the visibility test that appears in the error message section of the template
            expect(dataElem.hasClass('ng-hide')).toBeTruthy();
        });
    });

    describe('Tests when calls to forecast.io fail', function() {

        beforeEach(inject(function($controller, $rootScope, $document, $compile, ForecastService, $q, IconService) {
            scope = $rootScope.$new();
            forecastService = ForecastService;
            doc = $document;
            iconService = IconService;

            // Mock the two public functions in the ForecastService, note the initial service call fails
            spyOn(forecastService, 'getDarkSkyForecastData').and.callFake(function() {
                var defer = $q.defer();
                defer.reject({status: 666}); // Fall down, go boom
                return defer.promise;
            });
            // Don't need to mock this for fail tests, it won't be called
            spyOn(forecastService, 'massageDarkSkyForecastData');

            // Empty the document and add our element defined above, then compile into scope and digest.
            doc.find('body').empty();
            doc.find('body').append(elem);

            ctrl = $controller('HomeController as hc', {
                ForecastService: forecastService,
                IconService: iconService,
                $document: doc,
                $scope: scope
            });
            $compile(elem)(scope);
            scope.$digest();
        }));

        it('should have expected data in massagedData following an unsuccessful service call', function() {
            expect(ctrl.massagedData).toEqual({error: 'Error getting Dark Sky data, response: 666'});
        });

        it('should set Bootstrap hide class on the loading indicator after calling the ForecastService', function() {
            var loadingElem = angular.element(doc[0].getElementById('loading'));
            // note the elem template begins with loading class="show" this should have changed even if the call failed
            expect(loadingElem.hasClass('show')).toBeFalsy();
            expect(loadingElem.hasClass('hidden')).toBeTruthy();
        });

        it('should hide the data section of the template when the service calls are unsuccessful', function() {
            var dataElem = angular.element(doc[0].getElementById('fakedatahere'));
            // our 'fakedatahere' element includes the visibility test that appears in the forecast section of the template
            expect(dataElem.hasClass('ng-hide')).toBeTruthy();
        });

        it('should show the error message section of the template when the service calls are unsuccessful', function() {
            var dataElem = angular.element(doc[0].getElementById('fakeerrorhere'));
            // our 'fakeerrorhere' element includes the visibility test that appears in the error message section of the template
            expect(dataElem.hasClass('ng-hide')).toBeFalsy();
        });
    });

});
