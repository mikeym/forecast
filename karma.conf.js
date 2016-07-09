module.exports = function(config){
    config.set({
    
        basePath : './',
        
        files : [
            // required angular resource modules
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap.js',
            
            // application scripts and unit tests
            'app/app.js',
            'app/components/home/*.js',
            'tests/*.js'
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
