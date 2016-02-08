'use strict';


angular.module('workoutSummary').controller('MainCtrl', ['$scope', 'completedWorkouts', '$stateParams', '$window', function($scope, completedWorkouts, $stateParams, $window)
{
    //console.log(completedWorkouts);
    $scope.completedWorkouts = completedWorkouts.completedWorkouts;
    console.log($scope.completedWorkouts);

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

        //var data = [exercise1, exercise2, exercise3];
        var data = [];

        if ($scope.selectedWorkout.exercise1)
        {
            var exercise1 =
            {
                x: [1, 2, 3],
                y: $scope.selectedWorkout.exercise1Summary,
                name: $scope.selectedWorkout.exercise1,
                type: 'scatter'
            };
            data.push(exercise1);
        }

        if ($scope.selectedWorkout.exercise2)
        {
            var exercise2 =
            {
                x: [1, 2, 3],
                y: $scope.selectedWorkout.exercise2Summary,
                name: $scope.selectedWorkout.exercise2,
                type: 'scatter'
            };
            data.push(exercise2);
        }

        if ($scope.selectedWorkout.exercise3)
        {
            var exercise3 =
            {
                x: [1, 2, 3],
                y: $scope.selectedWorkout.exercise3Summary,
                name: $scope.selectedWorkout.exercise3,
                type: 'scatter'
            };
            data.push(exercise3);
        }




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
        var name3;

        for (var i = 0; i < uniqueWorkouts.length; i++)
        {
            console.log(uniqueWorkouts[i].exercise1);
            if (uniqueWorkouts[i].exercise1)
            {
                name1 = uniqueWorkouts[i].exercise1;
                console.log(name1);
                var averageReps1 = getAverageReps(uniqueWorkouts[i].exercise1Summary);
                y1.push(averageReps1);
            }
            if (uniqueWorkouts[i].exercise2)
            {
                name2 = uniqueWorkouts[i].exercise2;
                var averageReps2 = getAverageReps(uniqueWorkouts[i].exercise2Summary);
                y2.push(averageReps2);
            }
            if (uniqueWorkouts[i].exercise3)
            {
                name3 = uniqueWorkouts[i].exercise3;
                var averageReps3 = getAverageReps(uniqueWorkouts[i].exercise3Summary);
                y3.push(averageReps3);
            }

            var date = uniqueWorkouts[i].month + " " + uniqueWorkouts[i].day;




            x.push(date);




        }
        var data = [];
        if (name1)
        {
            var exercise1 =
            {
                x: x,
                y: y1,
                name: name1,
                type: 'scatter'
            };
            data.push(exercise1);
        }

        if (name2)
        {
            var exercise2 =
            {
                x: x,
                y: y2,
                name: name2,
                type: 'scatter'
            };
            data.push(exercise2);
        }
        if (name3)
        {
            var exercise3 =
            {
                x: x,
                y: y3,
                name: name3,
                type: 'scatter'
            };
            data.push(exercise3);
        }
        //var data = [exercise1, exercise2, exercise3];



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
