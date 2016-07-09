(function () {
    'use strict';

    // Basic home screen controller with a bound property for basic sanity-checking
    function HomeController(ForecastService, IconService, $log) {
        var vm = this;

        vm.appBlurb = 'Seattle weather for the next five days';
        vm.massagedData;
        vm.getIconClass = IconService.getIconClass;
        vm.getMoonClass = IconService.getMoonClass;

        ForecastService.getDarkSkyForecastData()
            .then(function(response) {
                vm.massagedData = ForecastService.massageDarkSkyForecastData(response);
            },
            function(response) {
                $log.debug('Error getting Dark Sky data, response: ' + response.status);
            });
    }
    
    angular
        .module('ForecastApp')
        .controller('HomeController', ['ForecastService', 'IconService', '$log', HomeController]);
})();
