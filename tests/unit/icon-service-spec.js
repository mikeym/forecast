'use strict';

describe('IconService tests', function() {
    var iconService;

    beforeEach(module('ForecastApp'));

    beforeEach(inject(function (IconService) {
        iconService = IconService;
    }));

    it('should have an IconClasses lookup object with the expected weather icon classname values', function() {
        expect(iconService.IconClasses).toBeDefined();
        expect(iconService.IconClasses['clear-day']).toEqual('wi-day-sunny');
        expect(iconService.IconClasses['clear-night']).toEqual('wi-night-clear');
        expect(iconService.IconClasses['rain']).toEqual('wi-rain');
        expect(iconService.IconClasses['snow']).toEqual('wi-snow');
        expect(iconService.IconClasses['sleet']).toEqual('wi-sleet');
        expect(iconService.IconClasses['wind']).toEqual('wi-strong-wind');
        expect(iconService.IconClasses['fog']).toEqual('wi-fog');
        expect(iconService.IconClasses['cloudy']).toEqual('wi-cloudy');
        expect(iconService.IconClasses['partly-cloudy-day']).toEqual('wi-day-cloudy');
        expect(iconService.IconClasses['partly-cloudy-night']).toEqual('wi-night-alt-cloudy');
        expect(iconService.IconClasses['hail']).toEqual('wi-hail');
        expect(iconService.IconClasses['thunderstorm']).toEqual('wi-thunderstorm');
        expect(iconService.IconClasses['tornado']).toEqual('wi-tornado');
        expect(iconService.IconClasses['unknown']).toEqual('wi-na');
    });

    it('should have a getIconClass function', function() {
        expect(iconService.getIconClass).toBeDefined();
        expect(angular.isFunction(iconService.getIconClass)).toBeTruthy();
    });

    it('should have a getMoonClass function', function() {
        expect(iconService.getMoonClass).toBeDefined();
        expect(angular.isFunction(iconService.getMoonClass)).toBeTruthy();
    });

    it('should have a getWindBearingClass function', function() {
        expect(iconService.getWindBearingClass).toBeDefined();
        expect(angular.isFunction(iconService.getWindBearingClass)).toBeTruthy();
    });

    it('should return the correct weather icon class name when getIconClass is called with a valid forecast icon value', function() {
        var returnedWeatherIconClassName = iconService.getIconClass('fog');
        expect(returnedWeatherIconClassName).toEqual('wi-fog');
    });

    it('should return the N/A placeholder weather icon class name when getIconClass is called with a bogus value', function() {
        var returnedWeatherIconClassName = iconService.getIconClass('pigs in a blanket');
        expect(returnedWeatherIconClassName).toEqual('wi-na');
    });

    it('should return the correct weather icon class name for a new moon when getMoonClass is called with a valid moonPhase value', function() {
        var returnedMoonPhaseClassName = iconService.getMoonClass(0.0);
        expect(returnedMoonPhaseClassName).toEqual('wi-moon-new');
    });

    it('should return the correct weather icon class name for a full moon when getMoonClass is called with a valid moonPhase value', function() {
        var returnedMoonPhaseClassName = iconService.getMoonClass(0.5);
        expect(returnedMoonPhaseClassName).toEqual('wi-moon-full');
    });

    it('should return the default weather icon class name when getMoonClass is called with an out-of-range moonPhase value', function() {
        var returnedMoonPhaseClassName = iconService.getMoonClass(999);
        expect(returnedMoonPhaseClassName).toEqual('wi-moon-waning-crescent-6');
    });

    it('should return the N/A weather icon class name when getMoonClass is called with a non-numeric moonPhase value', function() {
        var returnedMoonPhaseClassName = iconService.getMoonClass('prune sauce');
        expect(returnedMoonPhaseClassName).toEqual('wi-na');
    });
    
    it('should return the expected wind bearing weather icon class names when getWindBearingClass is called with a valid bearing', function() {
        var returnedWindBearingClassName = iconService.getWindBearingClass(37);
        expect(returnedWindBearingClassName).toEqual('wi-wind from-37-deg');
    });

    it('should return the N/A wind bearing weather icon class name when getWindBearingClass is called with a non-numeric value', function() {
        var returnedWindBearingClassName = iconService.getWindBearingClass('the dog chewed my boots');
        expect(returnedWindBearingClassName).toEqual('wi-na');
    });

    it('should return the N/A wind bearing weather icon class name when getWindBearingClass is called with a sub-zero number', function() {
        var returnedWindBearingClassName = iconService.getWindBearingClass(-73);
        expect(returnedWindBearingClassName).toEqual('wi-na');
    });

    it('should return the N/A wind bearing weather icon class name when getWindBearingClass is called with a number greater than 360', function() {
        var returnedWindBearingClassName = iconService.getWindBearingClass(999);
        expect(returnedWindBearingClassName).toEqual('wi-na');
    });
});
