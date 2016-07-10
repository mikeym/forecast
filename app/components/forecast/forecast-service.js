(function() {
  'use strict';

    angular
        .module('ForecastApp')
        
        // We're only asking for Seattle weather, otherwise the geo data would
        // be useful to get dynamically. Key for freebie account hard-coded.
        // We only ask for what we need.
        .constant('FC_IO', {
            'API_KEY' : '7459de8486fd25cdfcaf0aa2a3f506d1',
            'FORECAST_URL' : 'https://api.forecast.io/forecast/',
            'SEATTLE_LATITUDE' : '47.6062',
            'SEATTLE_LONGITUDE' : '-122.3321',
            'QUERY_PARAMS' : '?callback=JSON_CALLBACK&exclude=minutely,hourly,alerts,flags'
        });

    // Interacts with the Dark Sky Forecast API and manages the data formatting.
    function ForecastService($http, $q, FC_IO) {
        var svc = {
            getDarkSkyForecastData: getDarkSkyForecastData,
            massageDarkSkyForecastData: massageDarkSkyForecastData
        };
        
        // Formats the raw forecast.io response into usable format
        function massageDarkSkyForecastData(response) {
            var dailyData,
                massaged = {
                    daily: [ ],
                    error: null
                };

            if (response && response.data && response.data.daily && response.data.daily.data) {

                dailyData = response.data.daily.data;

                // Loop through each day and process just the stuff we're interested in.
                // Some of these properties would benefit from safety checks.
                angular.forEach(dailyData, function(day, key) {
                    massaged.daily[key] = { };
                    massaged.daily[key].dayOfWeek = moment.unix(day.time).format('ddd');
                    massaged.daily[key].icon = day.icon;
                    massaged.daily[key].summary = day.summary;
                    massaged.daily[key].precipProbability = formatPrecipitationProbibility(day.precipProbability);
                    massaged.daily[key].temperatureMin = parseInt(day.temperatureMin);
                    massaged.daily[key].temperatureMax = parseInt(day.temperatureMax);
                    massaged.daily[key].windSpeed = parseInt(day.windSpeed);
                    massaged.daily[key].windBearing = day.windBearing;
                    massaged.daily[key].moonPhase = day.moonPhase;
                });
            } else {
                massaged.error = 'Error parsing forecast data. It\'s probably raining.'
            }

            return massaged;
        }

        // Takes the rain percent value returned by the API and formats it for display
        function formatPrecipitationProbibility(prob) {
            var parsedProb = parseFloat(prob);
            if (isNaN(parsedProb)) {
                return '...'; // no value or maybe no rain hey lucky buy a lotto ticket
            } else {
                return parseInt(parsedProb * 100) + '%';
            }
        }

        // Asks nicely to let us know how many days in a row it's gonna rain
        function getDarkSkyForecastData() {
            var defer = $q.defer(),
                requestUrl = FC_IO.FORECAST_URL + FC_IO.API_KEY + '/' +
                             FC_IO.SEATTLE_LATITUDE + ',' + FC_IO.SEATTLE_LONGITUDE +
                             FC_IO.QUERY_PARAMS;

            $http.jsonp(requestUrl)
                .then(function success(response) {
                    defer.resolve(response);
                },
                function error(response) {
                    defer.reject(response);
                });
            return defer.promise;
        }

        return svc;
    }

    angular
      .module('ForecastApp')
      .service('ForecastService', ['$http', '$q', 'FC_IO', ForecastService]);

})();
