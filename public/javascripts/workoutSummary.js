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
    //console.log(completedWorkouts.completedWorkouts);

    var completedWorkoutsArray = [];

    // process the data and turn it into an array
    for (var completedWorkout in completedWorkouts.completedWorkouts)
    {
        var tempObj = completedWorkouts.completedWorkouts[completedWorkout];
        completedWorkoutsArray.push(tempObj);
    }
    console.log(completedWorkoutsArray);

    $scope.showGraph = function(completedWorkout)
    {
        console.log("Inside show graph");
        $scope.selectedWorkout = completedWorkout;

        console.log($scope.selectedWorkout);

        var exercise1 =
        {
            x: [1, 2, 3],
            y: $scope.selectedWorkout.exercise1Summary,
            name: $scope.selectedWorkout.exercise1,
            type: 'scatter'
        };

        var exercise2 =
        {
            x: [1, 2, 3],
            y: $scope.selectedWorkout.exercise2Summary,
            name: $scope.selectedWorkout.exercise2,
            type: 'scatter'
        };

        var exercise3 =
        {
            x: [1, 2, 3],
            y: $scope.selectedWorkout.exercise3Summary,
            name: $scope.selectedWorkout.exercise3,
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

        Plotly.newPlot('myDiv', data, layout);


    }

    $scope.isSelected = function(completedWorkout)
    {
        return $scope.selected === completedWorkout;
    }

    $scope.showProgress = function(workoutTitle)
    {
        console.log("Inside showProgress!");
        console.log(workoutTitle);

        // search for workouts with that title
        var uniqueWorkouts = [];

        for (var i = 0; i < completedWorkoutsArray.length; i++)
        {
            if (completedWorkoutsArray[i].title == workoutTitle)
            {
                uniqueWorkouts.push(completedWorkoutsArray[i]);
            }
        }
        console.log(uniqueWorkouts);

        var x = [];
        var y1 = [];
        var y2 = [];
        var y3 = [];

        var name1;
        var name2;
        var name2;

        for (var i = 0; i < uniqueWorkouts.length; i++)
        {

            name1 = uniqueWorkouts[i].exercise1;
            name2 = uniqueWorkouts[i].exercise2;
            name3 = uniqueWorkouts[i].exercise3;

            var date = uniqueWorkouts[i].month + " " + uniqueWorkouts[i].day;

            var averageReps1 = getAverageReps(uniqueWorkouts[i].exercise1Summary);
            var averageReps2 = getAverageReps(uniqueWorkouts[i].exercise2Summary);
            var averageReps3 = getAverageReps(uniqueWorkouts[i].exercise3Summary);

            x.push(date);

            y1.push(averageReps1);
            y2.push(averageReps2);
            y3.push(averageReps3);

        }

        var exercise1 =
        {
            x: x,
            y: y1,
            name: name1,
            type: 'scatter'
        };

        var exercise2 =
        {
            x: x,
            y: y2,
            name: name2,
            type: 'scatter'
        };

        var exercise3 =
        {
            x: x,
            y: y3,
            name: name3,
            type: 'scatter'
        };

        var data = [exercise1, exercise2, exercise3];


        var layout =
        {
            title: 'Workout Summary',
            xaxis: {
                title: 'Date',
                tick0: 0,
                dtick: 1

            },
            yaxis: {
                title: 'Average Reps'
            },
            showLegend: true,
            legend: {
                x: 1,
                y: 1
            }
        };

        Plotly.newPlot('myDiv', data, layout);

    }
}]);


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

function getAverageReps(myArray)
{
    var total = 0;
    for (var i = 0; i <myArray.length; i++)
    {
        total += myArray[i];
    }

    return total / myArray.length;
}
