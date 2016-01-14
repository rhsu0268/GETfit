var app = angular.module('recommendWorkout', ['ui.router']);

console.log("Inside recommendWorkout.js!");


app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('recommendWorkout', {
            url: '',
            templateUrl: '/recommendWorkout.html',
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
        return $http.get('/workouts').success(function(data)
        {
            angular.copy(data, workoutService.workouts);
            console.log(data);

        });

    };

    return workoutService;

}]);

app.controller('MainCtrl', ['$scope', 'workouts', '$stateParams', '$window', function($scope, workouts, $stateParams, $window) {

    $scope.workouts = workouts.workouts;
    $scope.recommendWorkout = function()
    {
        console.log("Inside recommend function!");

        var userLevel = $scope.level;
        var intensity = $scope.intensity;
        var goal = $scope.goal;

        var userWorkouts = $scope.workouts;
        console.log(userWorkouts);
    }
}]);
