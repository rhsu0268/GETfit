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

        $stateProvider.state('deleteWorkout', {
            url: '/deleteWorkout/{id}',
            templateUrl: '/planWorkout.html',
            controller: 'MainCtrl'
            /*
            controller: function($scope, $stateParams)
            {
                $scope.id = $stateParams.id;

            }
            */


        });




        $stateProvider.state('workouts', {

            url: '/workouts/{id}',
            templateUrl: '/workoutInfo.html',
            controller: 'WorkoutsCtrl',
            resolve: {

                workout: ['$stateParams', 'workouts', function($stateParams, workouts) {
                    //console.log(workouts.get[$stateParams.id]);
                    return workouts.get($stateParams.id);
                }]

            }
        });

        $stateProvider.state('doWorkout', {

            url: '/doWorkout/{id}',
            templateUrl: '/doWorkout.html',
            controller: 'DoWorkoutCtrl',
            resolve: {

                workout: ['$stateParams', 'workouts', function($stateParams, workouts) {
                    //console.log(workouts.get[$stateParams.id]);
                    return workouts.get($stateParams.id);
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

    workoutService.create = function(workout)
    {
        return $http.post('/workouts', workout).success(function (data)
        {
            //console.log(data);
            workoutService.workouts.push(data);
        });
    };


    workoutService.get = function(id)
    {
        //console.log('inside workoutService.get');
        return $http.get('/workouts/' + id).then(function (res) {
            //console.log(res);
            return res.data;
        });
    };

    workoutService.remove = function(id)
    {
        return $http.get('/deleteWorkout/' + id).then(function (res) {
            return res.data;
        });
    }

    workoutService.update = function(workout)
    {
        console.log("inside update");
        return $http.post('/updateWorkout/' + workout._id, workout).success(function (data) {
            console.log("inside update");
            console.log(data);

        });
    }
    return workoutService;

}]);

app.controller('MainCtrl', ['$scope', 'workouts', '$stateParams', '$window', function($scope, workouts, $stateParams, $window) {

    //console.log($stateParams.id);
    if ($stateParams.id)
    {
        var workoutId = $stateParams.id;
        console.log(workoutId);
        workouts.remove(workoutId);
        $window.location.href = '/planWorkout';
    }
    $scope.workouts = workouts.workouts;
    var newWorkout = {};
    //console.log($scope.workouts);

    $scope.addWorkout = function()
    {
        newWorkout.title = $scope.title;
        newWorkout.workoutSets = $scope.workoutSets;
        newWorkout.workoutReps = $scope.workoutReps;

        newWorkout.exercise1 = $scope.exercise1;
        newWorkout.exercise2 = $scope.exercise2;
        newWorkout.exercise3 = $scope.exercise3;
        newWorkout.exercise4 = $scope.exercise4;
        newWorkout.exercise5 = $scope.exercise5;
        newWorkout.exercise6 = $scope.exercise6;
        newWorkout.exercise7 = $scope.exercise7;
        newWorkout.exercise8 = $scope.exercise8;
        newWorkout.exercise9 = $scope.exercise9;

        console.log(newWorkout);

        //$scope.workouts.push(newWorkout);
        //console.log(workouts);

        workouts.create(newWorkout);

        $scope.title = '';
        $scope.workoutSets = '';
        $scope.workoutReps = '';

        $scope.exercise1 = '';
        $scope.exercise2 = '';
        $scope.exercise3 = '';
        $scope.exercise4 = '';
        $scope.exercise5 = '';
        $scope.exercise6 = '';
        $scope.exercise7 = '';
        $scope.exercise8 = '';
        $scope.exercise9 = '';


    }



}]);


app.controller('WorkoutsCtrl', ['$scope', 'workouts', 'workout', function($scope, workouts, workout)
{
    //console.log(workout);
    $scope.workout = workout;
    console.log($scope.workout);

    $scope.updateWorkout = function()
    {
        $scope.workout.title = $scope.title;
        $scope.workout.workoutSets = $scope.workoutSets;
        $scope.workout.workoutReps = $scope.workoutReps;

        $scope.workout.exercise1 = $scope.exercise1;
        $scope.workout.exercise2 = $scope.exercise2;
        $scope.workout.exercise3 = $scope.exercise3;

        console.log(workout);
        workouts.update(workout);
    }

}]);

app.controller('DoWorkoutCtrl', ['$scope', 'workouts', 'workout', function($scope, workouts, workout)
{
    //console.log(workout);
    $scope.workout = workout;
    console.log($scope.workout);

    $scope.updateWorkout = function()
    {
        $scope.workout.title = $scope.title;
        $scope.workout.workoutSets = $scope.workoutSets;
        $scope.workout.workoutReps = $scope.workoutReps;

        $scope.workout.exercise1 = $scope.exercise1;
        $scope.workout.exercise2 = $scope.exercise2;
        $scope.workout.exercise3 = $scope.exercise3;

        console.log(workout);
        workouts.update(workout);
    }

}]);
