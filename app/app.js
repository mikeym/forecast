(function () {
    'use strict';

    // Main application startup basically just routes to our home view.
    angular.module('ForecastApp', [
            'ngRoute',
            'ngAnimate'
        ])

        // Just the one view in this app
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'components/home/home-view.html',
                controller: 'HomeController',
                controllerAs: 'hc'
            })
            .otherwise({
                redirectTo: '/home'
            });
        }])
})();
