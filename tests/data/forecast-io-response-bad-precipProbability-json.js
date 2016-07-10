// Response from server tweaked to have bad values for precipProbability
// this is what we actually ask for. available to tests see forecast-service-spec.js
var forecastIoGoodResponseBadPrecipProbabilityJson = {
    "latitude": 47.6062,
    "longitude": -122.3321,
    "timezone": "America/Los_Angeles",
    "offset": -7,
    "currently": {
        "time": 1467941157,
        "summary": "Rain",
        "icon": "rain",
        "nearestStormDistance": 0,
        "precipIntensity": 0.0694,
        "precipIntensityError": 0.0012,
        "precipProbability": 1,
        "precipType": "rain",
        "temperature": 63.85,
        "apparentTemperature": 63.85,
        "dewPoint": 56.83,
        "humidity": 0.78,
        "windSpeed": 4.47,
        "windBearing": 210,
        "visibility": 9.47,
        "cloudCover": 0.95,
        "pressure": 1011.96,
        "ozone": 334.57
    },
    "daily": {
        "summary": "Light rain today through Wednesday, with temperatures rising to 75°F tomorrow.",
        "icon": "rain",
        "data": [
            {
                "time": 1467874800,
                "summary": "Light rain starting in the evening.",
                "icon": "rain",
                "sunriseTime": 1467894088,
                "sunsetTime": 1467950964,
                "moonPhase": 0.12,
                "precipIntensity": 0.0032,
                "precipIntensityMax": 0.0263,
                "precipIntensityMaxTime": 1467943200,
                "precipProbability": 'turkeypants',         // Nope
                "precipType": "rain",
                "temperatureMin": 58.31,
                "temperatureMinTime": 1467892800,
                "temperatureMax": 66.39,
                "temperatureMaxTime": 1467928800,
                "apparentTemperatureMin": 58.31,
                "apparentTemperatureMinTime": 1467892800,
                "apparentTemperatureMax": 66.39,
                "apparentTemperatureMaxTime": 1467928800,
                "dewPoint": 54.83,
                "humidity": 0.77,
                "windSpeed": 3.3,
                "windBearing": 206,
                "visibility": 10,
                "cloudCover": 0.84,
                "pressure": 1012.64,
                "ozone": 329.31
            },
            {
                "time": 1467961200,
                "summary": "Light rain until afternoon, starting again in the evening.",
                "icon": "rain",
                "sunriseTime": 1467980537,
                "sunsetTime": 1468037332,
                "moonPhase": 0.15,
                "precipIntensity": 0.0094,
                "precipIntensityMax": 0.0349,
                "precipIntensityMaxTime": 1468044000,
                "precipProbability": null,              // BAD
                "precipType": "rain",
                "temperatureMin": 60.27,
                "temperatureMinTime": 1467979200,
                "temperatureMax": 75.06,
                "temperatureMaxTime": 1468015200,
                "apparentTemperatureMin": 60.27,
                "apparentTemperatureMinTime": 1467979200,
                "apparentTemperatureMax": 75.06,
                "apparentTemperatureMaxTime": 1468015200,
                "dewPoint": 56.51,
                "humidity": 0.73,
                "windSpeed": 7.02,
                "windBearing": 213,
                "visibility": 9.41,
                "cloudCover": 0.85,
                "pressure": 1010.82,
                "ozone": 345.7
            },
            {
                "time": 1468047600,
                "summary": "Light rain starting in the afternoon.",
                "icon": "rain",
                "sunriseTime": 1468066989,
                "sunsetTime": 1468123698,
                "moonPhase": 0.18,
                "precipIntensity": 0.0092,
                "precipIntensityMax": 0.0297,
                "precipIntensityMaxTime": 1468047600,
                "precipProbability": 'Ninety-Nine Bottles Of Beer On The Wall', // BAD
                "precipType": "rain",
                "temperatureMin": 55.9,
                "temperatureMinTime": 1468065600,
                "temperatureMax": 70.07,
                "temperatureMaxTime": 1468098000,
                "apparentTemperatureMin": 55.9,
                "apparentTemperatureMinTime": 1468065600,
                "apparentTemperatureMax": 70.07,
                "apparentTemperatureMaxTime": 1468098000,
                "dewPoint": 53.76,
                "humidity": 0.76,
                "windSpeed": 7.01,
                "windBearing": 201,
                "visibility": 9.96,
                "cloudCover": 0.75,
                "pressure": 1013.99,
                "ozone": 352.96
            },
            {
                "time": 1468134000,
                "summary": "Light rain starting in the evening.",
                "icon": "rain",
                "sunriseTime": 1468153442,
                "sunsetTime": 1468210061,
                "moonPhase": 0.21,
                "precipIntensity": 0.0027,
                "precipIntensityMax": 0.0105,
                "precipIntensityMaxTime": 1468216800,
                "precipProbability": '',                // BAD
                "precipType": "rain",
                "temperatureMin": 53.93,
                "temperatureMinTime": 1468148400,
                "temperatureMax": 73.38,
                "temperatureMaxTime": 1468191600,
                "apparentTemperatureMin": 53.93,
                "apparentTemperatureMinTime": 1468148400,
                "apparentTemperatureMax": 73.38,
                "apparentTemperatureMaxTime": 1468191600,
                "dewPoint": 54.12,
                "humidity": 0.75,
                "windSpeed": 1.99,
                "windBearing": 234,
                "visibility": 10,
                "cloudCover": 0.56,
                "pressure": 1015.33,
                "ozone": 345.9
            },
            {
                "time": 1468220400,
                "summary": "Drizzle until afternoon.",
                "icon": "rain",
                "sunriseTime": 1468239896,
                "sunsetTime": 1468296422,
                "moonPhase": 0.24,
                "precipIntensity": 0.0041,
                "precipIntensityMax": 0.0082,
                "precipIntensityMaxTime": 1468220400,
                "precipProbability": {turkeys: 'wearing pants'},    // BAD
                "precipType": "rain",
                "temperatureMin": 57.77,
                "temperatureMinTime": 1468227600,
                "temperatureMax": 70.19,
                "temperatureMaxTime": 1468278000,
                "apparentTemperatureMin": 57.77,
                "apparentTemperatureMinTime": 1468227600,
                "apparentTemperatureMax": 70.19,
                "apparentTemperatureMaxTime": 1468278000,
                "dewPoint": 56.62,
                "humidity": 0.81,
                "windSpeed": 6.79,
                "windBearing": 192,
                "visibility": 10,
                "cloudCover": 0.67,
                "pressure": 1017.28,
                "ozone": 338.17
            }
            // that's probably enough
        ]
    }
};
