(function () {
    'use strict';

    // Create our TinyApp angular module
    angular.module('ForecastApp', [
            'ngRoute',
            'ngAnimate'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'components/home/home-view.html',
                controller: 'HomeController',
                controllerAs: 'hc'
            })
            .otherwise({
                redirectTo: '/home'
            });
        }]);
})();
