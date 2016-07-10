(function() {
    'use strict';

    function IconService() {
        var svc = {
            // Lookup for the weather icon to be associated with the Dark Sky icon property
            IconClasses : {
                'clear-day': 'wi-day-sunny',
                'clear-night': 'wi-night-clear',
                'rain': 'wi-rain',
                'snow': 'wi-snow',
                'sleet': 'wi-sleet',
                'wind': 'wi-strong-wind',
                'fog': 'wi-fog',
                'cloudy': 'wi-cloudy',
                'partly-cloudy-day': 'wi-day-cloudy',
                'partly-cloudy-night': 'wi-night-alt-cloudy',
                'hail': 'wi-hail',
                'thunderstorm': 'wi-thunderstorm',
                'tornado': 'wi-tornado',
                'unknown': 'wi-na'
            },
            getIconClass: getIconClass,
            getMoonClass: getMoonClass,
            getWindBearingClass: getWindBearingClass
        };

        // Icon getter with an unknown returned if not found
        function getIconClass(forecastIcon) {
            var iconClass = svc.IconClasses[forecastIcon];
            if (!iconClass) {
                iconClass = svc.IconClasses['unknown'];
            }
            return iconClass;
        }

        // Moon phase is returned by Dark Sky as a percentage ('0.33').
        // The Weather Icons library has an entire set of moon phases.
        // So getting your minimum daily moon icon requirement here.
        // Just seemed easier to return the class directly than look it up.
        function getMoonClass(forecastMoonPhase) {
            var mpPct = parseFloat(forecastMoonPhase),
                moonPhaseDay = 0.03386, // 1.0 / 29.53
                returnClass;

            if (isNaN(mpPct)) {
                returnClass = 'wi-na';
            } else {
                if (mpPct < moonPhaseDay) {
                    returnClass = 'wi-moon-new';
                } else if (mpPct < (moonPhaseDay * 2)) {
                    returnClass = 'wi-moon-waxing-crescent-1';
                } else if (mpPct < (moonPhaseDay * 3)) {
                    returnClass = 'wi-moon-waxing-crescent-2';
                } else if (mpPct < (moonPhaseDay * 4)) {
                    returnClass = 'wi-moon-waxing-crescent-3';
                } else if (mpPct < (moonPhaseDay * 5)) {
                    returnClass = 'wi-moon-waxing-crescent-4';
                } else if (mpPct < (moonPhaseDay * 6)) {
                    returnClass = 'wi-moon-waxing-crescent-5';
                } else if (mpPct < (moonPhaseDay * 7)) {
                    returnClass = 'wi-moon-waxing-crescent-6';
                } else if (mpPct < (moonPhaseDay * 8)) {
                    returnClass = 'wi-moon-first-quarter';
                } else if (mpPct < (moonPhaseDay * 9)) {
                    returnClass = 'wi-moon-waxing-gibbous-1';
                } else if (mpPct < (moonPhaseDay * 10)) {
                    returnClass = 'wi-moon-waxing-gibbous-2';
                } else if (mpPct < (moonPhaseDay * 11)) {
                    returnClass = 'wi-moon-waxing-gibbous-3';
                } else if (mpPct < (moonPhaseDay * 12)) {
                    returnClass = 'wi-moon-waxing-gibbous-4';
                } else if (mpPct < (moonPhaseDay * 13)) {
                    returnClass = 'wi-moon-waxing-gibbous-5';
                } else if (mpPct < (moonPhaseDay * 14)) {
                    returnClass = 'wi-moon-waxing-gibbous-6';
                } else if (mpPct < (moonPhaseDay * 15)) {
                    returnClass = 'wi-moon-full';
                } else if (mpPct < (moonPhaseDay * 16)) {
                    returnClass = 'wi-moon-waning-gibbous-1';
                } else if (mpPct < (moonPhaseDay * 17)) {
                    returnClass = 'wi-moon-waning-gibbous-2';
                } else if (mpPct < (moonPhaseDay * 18)) {
                    returnClass = 'wi-moon-waning-gibbous-3';
                } else if (mpPct < (moonPhaseDay * 19)) {
                    returnClass = 'wi-moon-waning-gibbous-4';
                } else if (mpPct < (moonPhaseDay * 20)) {
                    returnClass = 'wi-moon-waning-gibbous-5';
                } else if (mpPct < (moonPhaseDay * 21)) {
                    returnClass = 'wi-moon-waning-gibbous-6';
                } else if (mpPct < (moonPhaseDay * 22)) {
                    returnClass = 'wi-moon-third-quarter';
                } else if (mpPct < (moonPhaseDay * 23)) {
                    returnClass = 'wi-moon-waning-crescent-1';
                } else if (mpPct < (moonPhaseDay * 24)) {
                    returnClass = 'wi-moon-waning-crescent-2';
                } else if (mpPct < (moonPhaseDay * 25)) {
                    returnClass = 'wi-moon-waning-crescent-3';
                } else if (mpPct < (moonPhaseDay * 26)) {
                    returnClass = 'wi-moon-waning-crescent-4';
                } else if (mpPct < (moonPhaseDay * 27)) {
                    returnClass = 'wi-moon-waning-crescent-5';
                } else {
                    returnClass = 'wi-moon-waning-crescent-6';
                }
            }
            return returnClass;
        }
        
        function getWindBearingClass(forecastWindBearing) {
            var returnClass;
            if (isNaN(forecastWindBearing) || (forecastWindBearing < 0 || forecastWindBearing > 360)) {
                returnClass = 'wi-na';
            } else {
                returnClass = 'wi-wind from-' + forecastWindBearing + '-deg';
            }
            return returnClass;
        }


        return svc;
    }

    angular
    .module('ForecastApp')
    .service('IconService', [IconService]);

})();
