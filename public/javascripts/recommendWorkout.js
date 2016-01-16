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
                    //exercises.getAll();
                    return workouts.getAll();
                }],
                postPromise: ['workouts', 'exercises', function(workouts, exercises) {
                    return exercises.getAll();
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

app.factory('exercises', ['$http', function($http) {

    var exerciseService = {
        exercises: []
    };

    exerciseService.getAll = function() {
        return $http.get('/seedData').success(function(data)
        {
            angular.copy(data, exerciseService.exercises);
            console.log(data);


        });

    };

    return exerciseService;

}]);

app.controller('MainCtrl', ['$scope', 'workouts', 'exercises', '$stateParams', '$window', function($scope, workouts, exercises, $stateParams, $window) {

    $scope.workouts = workouts.workouts;
    //console.log(exercises.exerciseService);
    $scope.exercises = exercises.exercises;
    //console.log($scope.exercises.exercises);

    var exercisesArray = [];

    var count = 0;
    for (var exercise in $scope.exercises.exercises)
    {
        var tempObj = {};
        tempObj[exercise] = $scope.exercises[exercise];
        exercisesArray.push(tempObj);
        count++;
        console.log(count);
    }
    //console.log(count);

    console.log(exercisesArray.length);
    console.log(exercisesArray);
    $scope.recommendWorkout = function()
    {
        console.log("Inside recommend function!");

        var userLevel = $scope.level;
        var intensity = $scope.intensity;
        var goal = $scope.goal;

        var userWorkouts = $scope.workouts;
        console.log(userWorkouts);
        console.log($scope.exercises.length);





    }
}]);
