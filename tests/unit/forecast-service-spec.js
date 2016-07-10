'use strict';

describe('ForecastService tests', function() {
    var forecastService,
        httpBackend,
        q,
        fc_io,
        requestUrl;

    beforeEach(module('ForecastApp'));

    beforeEach(inject(function ($httpBackend, $q, FC_IO, ForecastService) {
        httpBackend = $httpBackend;
        q = $q;
        fc_io = FC_IO;
        forecastService = ForecastService;

        // just like in the service
        requestUrl = fc_io.FORECAST_URL + fc_io.API_KEY + '/' +
            fc_io.SEATTLE_LATITUDE + ',' + fc_io.SEATTLE_LONGITUDE +
            fc_io.QUERY_PARAMS;
    }));

    // test public methods are there
    it('should have a getDarkSkyForecastData function', function() {
        expect(forecastService.getDarkSkyForecastData).toBeDefined();
        expect(angular.isFunction(forecastService.getDarkSkyForecastData)).toBeTruthy();
    });

    it('should have a getDarkSkyForecastData function', function() {
        expect(forecastService.massageDarkSkyForecastData).toBeDefined();
        expect(angular.isFunction(forecastService.massageDarkSkyForecastData)).toBeTruthy();
    });

    it('should return expected response when getDarkSkyForecastData server call succeeds', function() {
        var successResponse,
            errorResponse;

        // success response is in forecast-io-good-response-json.js
        httpBackend.whenJSONP(requestUrl).respond(forecastIoGoodResponseJson);

        forecastService.getDarkSkyForecastData()
            .then(function(response) {
                successResponse = response;
            },
            function(response) {
                errorResponse = response;
            })
            .finally(function() {
                expect(successResponse).toEqual(forecastIoGoodResponseJson);
                expect(errorResponse).toBeUndefined();
            });
    });

    it('should return the expected response when getDarkSkyForecastData server call fails', function() {
        var successResponse,
            errorResponse;

        // Le Boom
        httpBackend.whenJSONP(requestUrl).respond(666, {status: 666});

        forecastService.getDarkSkyForecastData()
        .then(function(response) {
                successResponse = response;
            },
            function(response) {
                errorResponse = response;
            })
        .finally(function() {
            expect(successResponse).toBeUndefined;
            expect(errorResponse).toEqual({status: 666});
        });
    });

    it('should return error message when response data passed to massageDarkSkyForecastData is not right', function() {
        var massaged,
            expectedErrorResponse = {
                daily: [ ],
                error: 'Error parsing forecast data. It\'s probably raining.'
            };

        // if no response croak
        massaged = forecastService.massageDarkSkyForecastData(null);
        expect(massaged).toEqual(expectedErrorResponse);

        // if no response.data.daily croak
        massaged = forecastService.massageDarkSkyForecastData({data: 'toads'});
        expect(massaged).toEqual(expectedErrorResponse);

        // if no response.data.daily.data croak
        massaged = forecastService.massageDarkSkyForecastData({data: {daily: {toads: 'warty'}}});
        expect(massaged).toEqual(expectedErrorResponse);
    });

    // We'll check each of our properties separately using the same sample data

    it('should return data with the expected dayOfWeek value for each day when massageDarkSkyForecastData is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].dayOfWeek).toEqual('Thu');
        expect(massaged.daily[1].dayOfWeek).toEqual('Fri');
        expect(massaged.daily[2].dayOfWeek).toEqual('Sat');
        expect(massaged.daily[3].dayOfWeek).toEqual('Sun');
        expect(massaged.daily[4].dayOfWeek).toEqual('Mon');
        expect(massaged.daily[5].dayOfWeek).toEqual('Tue');
        expect(massaged.daily[6].dayOfWeek).toEqual('Wed');
    });

    it('should return data with the expected icon value for each day when massageDarkSkyForecastData ' + 
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].icon).toEqual('rain');
        expect(massaged.daily[1].icon).toEqual('rain');
        expect(massaged.daily[2].icon).toEqual('rain');
        expect(massaged.daily[3].icon).toEqual('rain');
        expect(massaged.daily[4].icon).toEqual('rain');
        expect(massaged.daily[5].icon).toEqual('rain'); // lol typical
        expect(massaged.daily[6].icon).toEqual('partly-cloudy-day');
    });

    it('should return data with the expected summary value for each day when massageDarkSkyForecastData ' + 
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].summary).toEqual('Light rain starting in the evening.');
        expect(massaged.daily[1].summary).toEqual('Light rain until afternoon, starting again in the evening.');
        expect(massaged.daily[2].summary).toEqual('Light rain starting in the afternoon.');
        expect(massaged.daily[3].summary).toEqual('Light rain starting in the evening.');
        expect(massaged.daily[4].summary).toEqual('Drizzle until afternoon.');
        expect(massaged.daily[5].summary).toEqual('Light rain starting in the evening.');
        expect(massaged.daily[6].summary).toEqual('Mostly cloudy until afternoon.');
    });

    // this indirectly tests the success path of the private formatPrecipitationProbability function
    it('should return data with the expected precipProbability value for each day when massageDarkSkyForecastData ' + 
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].precipProbability).toEqual('46%');
        expect(massaged.daily[1].precipProbability).toEqual('56%');
        expect(massaged.daily[2].precipProbability).toEqual('55%');
        expect(massaged.daily[3].precipProbability).toEqual('44%');
        expect(massaged.daily[4].precipProbability).toEqual('37%');
        expect(massaged.daily[5].precipProbability).toEqual('49%');
        expect(massaged.daily[6].precipProbability).toEqual('22%');
    });

    // this indirectly tests the bad data path of the private formatPrecipitationProbability function
    // I wasn't completely sure what to do in this error case, but since math was involved wanted to check
    it('should return data with the expected precipProbability value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response that contains invalid precipProbability values', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseBadPrecipProbabilityJson});
        expect(massaged.daily[0].precipProbability).toEqual('...');
        expect(massaged.daily[1].precipProbability).toEqual('...');
        expect(massaged.daily[2].precipProbability).toEqual('...');
        expect(massaged.daily[3].precipProbability).toEqual('...');
        expect(massaged.daily[4].precipProbability).toEqual('...');
        // chopped a couple days off the end 'cause lazy
    });

    // happy path only in the service now, could use hardening for this prop
    it('should return data with the expected temperatureMin value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].temperatureMin).toEqual(58);
        expect(massaged.daily[1].temperatureMin).toEqual(60);
        expect(massaged.daily[2].temperatureMin).toEqual(55);
        expect(massaged.daily[3].temperatureMin).toEqual(53);
        expect(massaged.daily[4].temperatureMin).toEqual(57);
        expect(massaged.daily[5].temperatureMin).toEqual(57);
        expect(massaged.daily[6].temperatureMin).toEqual(56);
    });

    // max temp also only happy path in service now
    it('should return data with the expected temperatureMax value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].temperatureMax).toEqual(66);
        expect(massaged.daily[1].temperatureMax).toEqual(75);
        expect(massaged.daily[2].temperatureMax).toEqual(70);
        expect(massaged.daily[3].temperatureMax).toEqual(73);
        expect(massaged.daily[4].temperatureMax).toEqual(70);
        expect(massaged.daily[5].temperatureMax).toEqual(71);
        expect(massaged.daily[6].temperatureMax).toEqual(72);
    });

    // wind speed only happy path in service now, plus this value sounds like it might be flaky
    // from the service. would like to see more example responses to know what to expect.
    it('should return data with the expected windSpeed value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].windSpeed).toEqual(3);
        expect(massaged.daily[1].windSpeed).toEqual(7);
        expect(massaged.daily[2].windSpeed).toEqual(7);
        expect(massaged.daily[3].windSpeed).toEqual(1);
        expect(massaged.daily[4].windSpeed).toEqual(6);
        expect(massaged.daily[5].windSpeed).toEqual(3);
        expect(massaged.daily[6].windSpeed).toEqual(1);
    });

    it('should return data with the expected windBearing value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].windBearing).toEqual(206);
        expect(massaged.daily[1].windBearing).toEqual(213);
        expect(massaged.daily[2].windBearing).toEqual(201);
        expect(massaged.daily[3].windBearing).toEqual(234);
        expect(massaged.daily[4].windBearing).toEqual(192);
        expect(massaged.daily[5].windBearing).toEqual(192);
        expect(massaged.daily[6].windBearing).toEqual(3);
    });

    it('should return data with the expected moonPhase value for each day when massageDarkSkyForecastData ' +
        'is called with a valid response', function() {
        var massaged = forecastService.massageDarkSkyForecastData({data: forecastIoGoodResponseExcludesJson});
        expect(massaged.daily[0].moonPhase).toEqual(0.12);
        expect(massaged.daily[1].moonPhase).toEqual(0.15);
        expect(massaged.daily[2].moonPhase).toEqual(0.18);
        expect(massaged.daily[3].moonPhase).toEqual(0.21);
        expect(massaged.daily[4].moonPhase).toEqual(0.24);
        expect(massaged.daily[5].moonPhase).toEqual(0.27);
        expect(massaged.daily[6].moonPhase).toEqual(0.3);
    });

});
