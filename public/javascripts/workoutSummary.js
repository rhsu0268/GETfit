var app = angular.module('workoutSummary', ['ui.router']);


console.log("Inside workoutSummary.js!");

app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('workoutSummary', {
            url: '',
            templateUrl: '/workoutSummary.html',
            controller: 'MainCtrl',
            resolve: {

                postPromise: ['completedWorkouts', 'auth', function(completedWorkouts, auth) {
                    return completedWorkouts.getAll(auth.getUserId());
                }]
            }

        });

    }

]);

/*
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
*/

app.factory('completedWorkouts', ['$http', function($http) {

    var completedWorkoutsService = {
        completedWorkouts: []
    };

    completedWorkoutsService.getAll = function(userId) {
        return $http.get('/completedWorkouts/' + userId).success(function(data)
        {
            console.log(data);
            angular.copy(data, completedWorkoutsService.completedWorkouts);
            console.log(completedWorkoutsService.completedWorkouts);

        });

    };

    completedWorkoutsService.create = function(workout)
    {
        return $http.post('/completedWorkouts', workout).success(function (data)
        {
            console.log(data);
            //workoutService.workouts.push(data);
        });
    };
    return completedWorkoutsService;

}]);





app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

}]);
