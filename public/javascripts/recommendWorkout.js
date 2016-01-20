var app = angular.module('recommendWorkout', ['ui.router']);

console.log("Inside recommendWorkout.js!");



app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('recommendWorkout', {
            url: '',
            templateUrl: '/recommendWorkoutForm.html',
            controller: 'MainCtrl',
            resolve: {

                workoutPromise: ['workouts', function(workouts) {
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
    //console.log($scope.workouts);
    $scope.exercises = exercises.exercises;
    //console.log($scope.exercises.exercises.exercise1);

    var exercisesArray = [];


    for (var exercise in $scope.exercises.exercises)
    {
        var tempObj = $scope.exercises.exercises[exercise];
        exercisesArray.push(tempObj);
    }

    var exercisesCount = exercisesArray.length;
    //console.log(exercisesArray);

    var userWorkouts = $scope.workouts;
    //console.log(userWorkouts);


    // turn the workouts into an array
    $scope.recommendWorkout = function()
    {
        console.log("Inside recommend function!");

        $scope.userLevel = $scope.level;
        $scope.userIntensity = $scope.intensity;
        $scope.userGoal = $scope.goal;
        //console.log(goal);


        $scope.sets;
        $scope.reps;
        $scope.numExercises;

        // optimization algorithm

        //var userLevelValue;
        //var intensityValue;

        var beginnerExercises = [];
        var intermediateExercises = [];

        // userLevel - grab the exercises in the user's level
        if ($scope.userLevel == "Beginner")
        {
            //userLevelValue = Math.floor((Math.random() * 4) + 1);

            // get the workouts that belong to beginner category
            for (var i = 0; i < exercisesCount; i++)
            {
                //console.log(exercisesArray[i]);
                if (exercisesArray[i].level == "beginner")
                {
                    beginnerExercises.push(exercisesArray[i]);
                }
            }
        }
        else if ($scope.userLevel == "Intermediate")
        {
            //userLevelValue = Math.floor((Math.random() * 3) + 5);

            for (var i = 0; i < exercisesCount; i++)
            {
                //console.log(exercisesArray[i]);
                if (exercisesArray[i].level == "intermediate")
                {
                    intermediateExercises.push(exercisesArray[i]);
                }
            }
        }
        else
        {
            //userLevelValue = Math.floor((Math.random() * 4) + 7);
            //console.log(userLevelValue);
            $scope.noExercise = "Sorry, you have selected the expert level and there are no exercises for that in my DB yet!"
        }

        // intensity - use a scale from 1 - 10 (score based on user's intensity) as well as age and BMI
        // use it to determine the rest time in between groups of workouts

        $scope.restTime;
        if ($scope.userIntensity == "High")
        {
            $scope.restTime = 1;
            //console.log(intensityValue);
        }
        else if ($scope.userIntensity == "Moderate")
        {
            $scope.restTime = 2;
            //console.log(intensityValue);
        }
        else if ($scope.userIntensity == "Low")
        {
            $scope.restTime = 3;
            //console.log(intensityValue);
        }

        // goal - look at the person's personal fitness goal (change reps and sets accordingly)
        if ($scope.userGoal== "Maximal Strength")
        {
            // set range: Higher rep range: 1 - 5, less exercises
            $scope.reps = 3;
            $scope.sets = 5;
            $scope.numExercises = 2;
            //console.log(reps + " " + sets + " " + numExercises);

        }
        else if ($scope.userGoal == "Muscle Building")
        {
            $scope.reps = 8;
            $scope.sets = 3;
            $scope.numExercises = 3;
        }
        else if ($scope.userGoal == "Endurance")
        {
            // set range: Lower rep range: 12 - 15, more exercises
            $scope.reps = 13;
            $scope.sets = 1;
            $scope.numExercises = 4;
            //console.log(reps + " " + sets + " " + numExercises);
        }

        console.log(beginnerExercises);
        console.log(intermediateExercises);

        // plan 3 workouts

        // # 1 - Based on user preferences

        // narrow down results based on user's preferences
        $scope.workout1 = [];
        while (!checkIfArrayIsUnique($scope.workout1))
        {
            for (var i = 0; i < $scope.numExercises; i++)
            {

                if ($scope.userLevel == "Beginner")
                {
                    var index = Math.floor((Math.random() * beginnerExercises.length));
                    $scope.workout1.push(beginnerExercises[index]);
                }
                else if ($scope.userLevel == "Intermediate")
                {
                    var index = Math.floor((Math.random() * intermediateExercises.length));
                    $scope.workout1.push(intermediateExercises[index]);
                }

            }
        }

        console.log($scope.workout1);

        // # 2 - Based on user's planned workouts


        // # 3 - Mix between the 2

    }

    function checkIfArrayIsUnique(myArray)
    {
        // handle the case that the array has 0 elements (first iteration)
        if (myArray.length == 0)
        {
            return false;
        }
        for (var i = 0; i < myArray.length; i++)
        {
            for (var j = 0; j < myArray.length; j++)
            {
                if (i != j)
                {
                    if (myArray[i] == myArray[j])
                    {
                        return false; // means there are duplicate values
                    }
                }
            }
        }
        return true; // means there are no duplicate values.
    }
}]);
