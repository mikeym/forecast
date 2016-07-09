(function () {
    'use strict';

    // Basic home screen controller with a bound property for basic sanity-checking
    function HomeController(ForecastService, IconService, $log) {
        var vm = this;

        vm.today = moment().format('dddd, MMMM D, YYYY');
        vm.massagedData;
        vm.getIconClass = IconService.getIconClass;
        vm.getMoonClass = IconService.getMoonClass;
        vm.getWindBearingClass = IconService.getWindBearingClass;

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
