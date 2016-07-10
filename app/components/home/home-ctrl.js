(function () {
    'use strict';

    // The Home Controller calls the Dark Sky server via the ForecastService.
    // It them asks the ForecastService to format the returned data for consumption.
    // The controller then makes this data available to the view.
    function HomeController(ForecastService, IconService, $document) {
        var vm = this,
            loadingIndicator = angular.element($document[0].getElementById('loading'));

        // The loading indicator defaults to visible as the outer index.html template
        // loads, but we do this here anyway because obsessive or something. This whole
        // loader icon behaviour is scruffy.
        showLoading(true);

        // Bound controller properties available to the view.
        vm.today = moment().format('dddd, MMMM D, YYYY');
        vm.massagedData;
        vm.getIconClass = IconService.getIconClass;
        vm.getMoonClass = IconService.getMoonClass;
        vm.getWindBearingClass = IconService.getWindBearingClass;

        // Calls ForecastService on initial load only for this prototype. We'd want a
        // refresh button or something for a production app.
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
