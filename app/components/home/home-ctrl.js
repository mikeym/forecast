(function () {
    'use strict';

    // Basic home screen controller with a bound property for basic sanity-checking
    function HomeController(ForecastService, IconService, $document) {
        var vm = this,
            loadingIndicator = angular.element($document[0].getElementById('loading'));

        showLoading(true);
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
                vm.massagedData = {
                    error: 'Error getting Dark Sky data, response: ' + response.status
                };
            })
            .finally(function() {
                showLoading(false);
            });

        // This should be a directive monitoring an event on rootScope but low on time and
        // want to write some tests. If true, shows the loading spinner, if false, hides it.
        function showLoading(showIt) {
            var classToAdd = showIt ? 'show' : 'hidden';
            loadingIndicator.removeClass('show hidden');
            loadingIndicator.addClass(classToAdd);
        }
    }
    
    angular
        .module('ForecastApp')
        .controller('HomeController', ['ForecastService', 'IconService', '$document', HomeController]);
})();
