var app = angular.module('recommendWorkout', ['ui.router']);

console.log("Inside recommendWorkout.js!");


app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('recommendWorkout', {
            url: '',
            templateUrl: '/recommendWorkout.html',
            controller: 'MainCtrl'


        });
    }

]);

app.controller('MainCtrl', ['$scope', '$stateParams', '$window', function($scope, $stateParams, $window) {


}]);
