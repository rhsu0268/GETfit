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

                postPromise: ['completedWorkouts', function(completedWorkouts) {
                    return completedWorkouts.getAll();
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

    completedWorkoutsService.getAll = function() {
        return $http.get('/completedWorkouts').success(function(data)
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


//var plotly = require('plotly')('rhsu0268', 'pxqr91oaa8');
app.controller('MainCtrl', ['$scope', 'completedWorkouts', '$stateParams', '$window', function($scope, completedWorkouts, $stateParams, $window) {

    $scope.completedWorkouts = completedWorkouts.completedWorkouts;
    console.log(completedWorkouts.completedWorkouts);

    var completedWorkoutsArray = [];

    // process the data and turn it into an array
    for (var completedWorkout in completedWorkouts.completedWorkouts)
    {
        var tempObj = completedWorkouts.completedWorkouts[completedWorkout];
        completedWorkoutsArray.push(tempObj);
    }
    console.log(completedWorkoutsArray);

    var uniqueWorkouts = [];

    for (var i = 0; i < completedWorkoutsArray.length; i++)
    {
        uniqueWorkouts.push(completedWorkoutsArray[i].title);
    }

    $scope.showGraph = function(completedWorkout)
    {
        console.log("Inside show graph");
        $scope.selected = completedWorkout;

        console.log($scope.selected);
    }

    $scope.isSelected = function(completedWorkout)
    {
        return $scope.selected === completedWorkout;
    }





    console.log(completedWorkoutsArray[0]);
    console.log(completedWorkoutsArray[1]);

    //var exercise1 = completedWorkoutsArray[0].exercise1;
    var exercise1 =
    {
        x: [1, 2, 3],
        y: completedWorkoutsArray[0].exercise1Summary,
        name: completedWorkoutsArray[0].exercise1,
        type: 'scatter'
    };

    var exercise2 =
    {
        x: [1, 2, 3],
        y: completedWorkoutsArray[0].exercise2Summary,
        name: completedWorkoutsArray[0].exercise2,
        type: 'scatter'
    };

    var exercise3 =
    {
        x: [1, 2, 3],
        y: completedWorkoutsArray[0].exercise3Summary,
        name: completedWorkoutsArray[0].exercise3,
        type: 'scatter'
    };



    var data = [exercise1, exercise2, exercise3];


    var layout =
    {
        title: 'Workout Summary',
        xaxis: {
            title: 'Set',
            tick0: 0,
            dtick: 1

        },
        yaxis: {
            title: 'Reps'
        },
        showLegend: true,
        legend: {
            x: 1,
            y: 1
        }
    };

    /*
    var data = [
    {
        x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
        y: [1, 3, 6],
        type: 'scatter'
      }
    ];
    */

    Plotly.newPlot('myDiv', data, layout);




}]);

/*

app.filter('unique', function() {
    return function(collection, title)
    {
        var output = [];
        var keys = [];

        angular.forEach(collection, function(item) {
            var key = item[title];
            if (keys.indexOf(key) === -1)
            {
                keys.push(key);
                output.push(item);
            }

        });

        return output;

    };


});
*/
