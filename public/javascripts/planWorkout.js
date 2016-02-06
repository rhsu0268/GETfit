var app = angular.module('planWorkout', ['ui.router', 'flash']);

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

                postPromise: ['workouts', 'auth', function(workouts, auth) {
                    return workouts.getAll(auth.getUserId());
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


app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['GETfit-token'] = token;
    };

    auth.getToken = function()
    {
        return $window.localStorage['GETfit-token'];
    };

    auth.isLoggedIn = function()
    {
        var token = auth.getToken();

        if (token)
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        }
        else
        {
            return false;
        }
    };

    auth.currentUser = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.getUserId = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload._id;
        }
    };

    auth.register = function(user)
    {
        return $http.post('/register', user).success(function(data) {

            auth.saveToken(data.token);

        });
    };

    auth.logIn = function(user)
    {
        return $http.post('/login', user).success(function(data) {

            auth.saveToken(data.token);

        });
    };

    auth.logOut = function()
    {
        $window.localStorage.removeItem('GETfit-token');
    };
    return auth;
}]);


app.factory('workouts', ['$http', function($http) {

    var workoutService = {
        workouts: []
    };

    workoutService.getAll = function(userId) {
        return $http.get('/getUserworkouts/' + userId).success(function(data)
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
            console.log(res.data);
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


app.factory('completedWorkouts', ['$http', function($http) {

    var completedWorkoutsService = {
        completedWorkouts: []
    };

    completedWorkoutsService.getAll = function() {
        return $http.get('/completedWorkouts').success(function(data)
        {
            //angular.copy(data, workoutService.workouts);
            console.log(data);

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

app.controller('MainCtrl', ['$scope', 'workouts', '$stateParams', '$window', 'auth', function($scope, workouts, $stateParams, $window, auth) {

    $scope.currentUser = auth.currentUser();
    console.log($scope.currentUser);
    if ($stateParams.id)
    {
        var workoutId = $stateParams.id;
        console.log(workoutId);
        workouts.remove(workoutId);
        $window.location.href = '/planWorkout';
    }
    $scope.workouts = workouts.workouts;
    console.log($scope.workouts);
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
        newWorkout.user = auth.getUserId();
        console.log(newWorkout.user);
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


app.controller('WorkoutsCtrl', ['$scope', 'workouts', 'workout', 'auth', function($scope, workouts, workout, auth)
{
    $scope.currentUser = auth.currentUser();
    console.log($scope.currentUser);

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

app.controller('DoWorkoutCtrl', ['$scope', 'workouts', 'workout', 'completedWorkouts', 'Flash', function($scope, workouts, workout, completedWorkouts, Flash)
{
    //console.log(workout);
    $scope.workout = workout;
    console.log($scope.workout);

    $scope.addCompletedWorkout = function()
    {
        console.log("Adding completed workout!");
        var month = $scope.month;
        console.log(month);

        var day = $scope.day;
        console.log(day);

        var year = $scope.year;
        console.log(year);

        var title = $scope.workout.title;

        // store the exercise
        var exercise1 = $scope.workout.exercise1;
        var exercise2 = $scope.workout.exercise2;
        var exercise3 = $scope.workout.exercise3;

        // store the exercise9

        var e1s1 = $scope.e1s1;
        var e1s2 = $scope.e1s2;
        var e1s3 = $scope.e1s3;

        var e2s1 = $scope.e2s1;
        var e2s2 = $scope.e2s2;
        var e2s3 = $scope.e2s3;

        var e3s1 = $scope.e3s1;
        var e3s2 = $scope.e3s2;
        var e3s3 = $scope.e3s3;

        var workoutSummary = {
            month: month,
            day: day,
            year: year,
            title: title,
            exercise1: exercise1,
            exercise1Summary: [e1s1, e1s2, e1s3],
            exercise2: exercise2,
            exercise2Summary: [e2s1, e2s2, e2s3],
            exercise3: exercise3,
            exercise3Summary: [e3s1, e3s2, e3s3]
        };

        completedWorkouts.create(workoutSummary);

        $scope.successAlert();

        console.log(workoutSummary);

    }


    $scope.successAlert = function () {
       var message = '<strong>Well done!</strong> You successfully entered your summary for this workout!';
       Flash.create('success', message, 'custom-class');
       // First argument (success) is the type of the flash alert
       // Second argument (message) is the message displays in the flash alert
       // you can inclide html as message (not just text)
       // Third argument (custom-class) is the custom class for the perticular flash alert
    }


}]);

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

}]);
