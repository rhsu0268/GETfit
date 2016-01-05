var app = angular.module('myFitness', ['ui.router']);

console.log("Inside myfitness.js!");

app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('myFitness', {
            url: '',
            templateUrl: '/myFitness.html',
            controller: 'MainCtrl'

        });
    }

]);


app.controller('MainCtrl', ['$scope', function($scope) {



}]);
