module.exports = function(config){
    config.set({
    
        basePath : './',
        
        files : [
            // required angular resource modules
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/moment/moment.js',
            
            // application scripts
            'app/app.js',
            'app/components/home/*.js',
            'app/components/forecast/*.js',
            'app/components/day/icon-service.js',

            // test fixtures
            'tests/data/*.js',

            // unit tests
            'tests/unit/*.js'
        ],
        
        autoWatch : true,
        
        frameworks: ['jasmine'],
        
        browsers : ['Chrome'],
        
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        
        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    
    });
};
