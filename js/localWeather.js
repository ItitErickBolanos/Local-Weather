var app = angular.module("localWeather", []);

app.factory("weatherAPI", ["$http", function($http){
    var weatherObj = {};

    weatherObj.getLocation = function(){
        return $http({
            method: "GET",
            url: "http://ipinfo.io/json"
        });
    };

    weatherObj.getCurrentWeather = function(city){
        return $http({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=5be11a5c51574e144ab185833c8c026d"
        });
    }

    return weatherObj;
}]);

app.controller("weatherController", ['$scope', 'weatherAPI', function($scope, weatherAPI){

    var weatherIcons = {
        "Drizzle" : "wi-sleet",
        "Clouds" : "wi-cloudy",
        "Rain" : "wi-rain",
        "Snow" : "wi-snow",
        "Clear" : "wi-day-sunny",
        "Thunderstorm" : "wi-thunderstorm"
    }

    $scope.temp_unit = "C";

    weatherAPI.getLocation()
    .success(function(resp){
        $scope.city = resp.city;
        $scope.country = resp.country;
        weatherAPI.getCurrentWeather(resp.city)
        .success(function(data){
            $scope.temp = data.main.temp;
            $scope.weather = data.weather[0].main;
            $scope.weatherClass = weatherIcons[$scope.weather];
        })
        .error(function(error){
            console.log(error);
        });
    })
    .error(function(error){
        console.log(error);
    });

    $scope.change_unit = function(){
        if ($scope.temp_unit == "C"){
            $scope.temp_unit = "F";
            $scope.temp = Math.round(($scope.temp * 9) / 5 + 32);
        } else {
            $scope.temp_unit = "C";
            $scope.temp = Math.round(($scope.temp - 32) * 5 / 9);
        }
    };
}]);
