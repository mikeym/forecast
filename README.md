# Seattle Five-Day Forecast

This is a small Angular project that displays a five-day weather forecast for Seattle.
Weather data is courtesy of the [Dark Sky API](https://developer.forecast.io/). The
weather icons are courtesy of [Weather Icons](https://erikflowers.github.io/weather-icons/).
Other deployed technologies include [Bootstrap](http://getbootstrap.com/) for layout,
[Font Awesome](http://fontawesome.io/) for the loading and GitHub icons, and
[Moment.js](http://momentjs.com/) for a couple of time operations.

Testing technologies include [Karma](https://karma-runner.github.io/1.0/index.html) and
[Jasmine](http://jasmine.github.io/).

## Installation
To install the various node and bower dependencies not included in the project, issue
this terminal command:

    npm install

## Launching the application
After running npm install and starting your webserver, open a web browser and enter the url:

    http://[your webserver/project root probably]/app/#/home

## Running the unit tests
To run the unit tests, issue this terminal command:

    karma start karma.conf.js
    
To exit the tests, enter:

    ctrl + y
    
## Dark Sky API License Key
I've checked my current API key into the project. I'll probably change it after a bit, so
you'll need to get your own. It's free to get your own key, and it supports up to 1000
free calls every 24 hours. You'll need to modify the existing value set as a constant in
app/components/forecast/forecast-service.js

    'API_KEY' : '7459de8486fd25cdfcaf0aa2a3f506d1',

Just put your own key in and you're good to go. If you're planning to hook up your
credit card and get a commercial account, you probably want to approach this in some other
way.

## Known quirks, July 2016
* My local webserver testing environment is currently unsettled following one of those
  spectacular Mac OS upgrades that sometimes go all sideways, so the application
  has not been tested in IE or on mobile devices. Probably something isn't right.
* I'm working a couple of tight deadlines simultaneously, and haven't had time to
  create end-to-end tests for the application.
* I hope you're interested in the weather in Seattle, and not in say Paris. Not that
  there's anything wrong with being interested in the weather in Paris, I like Paris
  a lot, that's just not what this app does.

## License
This project is licensed under the terms of the MIT license.
