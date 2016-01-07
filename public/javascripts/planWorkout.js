var app = angular.module('planWorkout', ['ui.router']);

console.log("Inside planWorkout.js!");

app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('planWorkout', {
            url: '',
            templateUrl: '/planWorkout.html',
            controller: 'MainCtrl',
            resolve: {

                postPromise: ['workouts', function(workouts) {
                    return workouts.getAll();
                }]
            }

        });
    }

]);

app.factory('workouts', ['$http', function($http) {

    var workoutService = {
        workouts: []
    };

    workoutService.getAll = function() {
        return $http.get('/workouts').success(function(data) {
            angular.copy(data, workoutService.workouts);
            //console.log(data);

        });

    };
    return workoutService;

}]);

app.controller('MainCtrl', ['$scope', 'workouts', function($scope, workouts) {

    $scope.workouts = workouts.workouts;
    var newWorkout = {};

    $scope.addWorkout = function()
    {
        newWorkout.group = $scope.group;
        newWorkout.exercise1 = $scope.exercise1;
        newWorkout.reps1 = $scope.reps1;
        newWorkout.exercise2 = $scope.exercise2;
        newWorkout.reps2 = $scope.reps2;
        newWorkout.exercise3 = $scope.exercise3;
        newWorkout.reps3 = $scope.reps3;
        //console.log(newWorkout);

        $scope.workouts.push(newWorkout);
        console.log(workouts);

        $scope.group = '';
        $scope.exercise1 = '';
        $scope.exercise2 = '';
        $scope.exercise3 = '';
        $scope.reps1 = '';
        $scope.reps2 = '';
        $scope.reps3 = '';

    }


}]);
