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

        var userLevel = $scope.level;
        var intensity = $scope.intensity;
        var goal = $scope.goal;
        console.log(goal);


        $scope.sets;
        $scope.reps;
        $scope.numExercises;

        // optimization algorithm

        var userLevelValue;
        var intensityValue;

        var beginnerExercises = [];
        var intermediateExercises = [];

        // userLevel - grab the exercises in the user's level
        if (userLevel == "Beginner")
        {
            userLevelValue = Math.floor((Math.random() * 4) + 1);
            //console.log(userLevelValue);

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
        else if (userLevel == "Intermediate")
        {
            userLevelValue = Math.floor((Math.random() * 3) + 5);
            //console.log(userLevelValue);

            for (var i = 0; i < exercisesCount; i++)
            {
                //console.log(exercisesArray[i]);
                if (exercisesArray[i].level == "intermediate")
                {
                    intermediateExercises.push(exercisesArray[i]);
                }
            }
        }
        else if (userLevel == "Expert")
        {
            userLevelValue = Math.floor((Math.random() * 4) + 7);
            console.log(userLevelValue);
        }

        // intensity - use a scale from 1 - 10 (score based on user's intensity) as well as age and BMI
        // use it to determine the rest time in between groups of workouts

        $scope.restTime;
        if (intensity == "High")
        {
            $scope.restTime = 1;
            //console.log(intensityValue);
        }
        else if (intensity == "Moderate")
        {
            $scope.restTime = 2;
            //console.log(intensityValue);
        }
        else if (intensity == "Low")
        {
            $scope.restTime = 3;
            //console.log(intensityValue);
        }

        // goal - look at the person's personal fitness goal (change reps and sets accordingly)
        if (goal == "Maximal Strength")
        {
            // set range: Higher rep range: 1 - 5, less exercises
            $scope.reps = 3;
            $scope.sets = 5;
            $scope.numExercises = 2;
            //console.log(reps + " " + sets + " " + numExercises);

        }
        else if (goal == "Muscle Building")
        {
            $scope.reps = 8;
            $scope.sets = 3;
            $scope.numExercises = 3;
        }
        else if (goal == "Endurance")
        {
            // set range: Lower rep range: 12 - 15, more exercises
            $scope.reps = 13;
            $scope.sets = 1;
            $scope.numExercises = 4;
            //console.log(reps + " " + sets + " " + numExercises);
        }


        // plan 3 workouts

        // # 1 - Based on user preferences

        // narrow down results based on user's preferences
        $scope.workout1 = [];
        for (var i = 0; i < $scope.numExercises; i++)
        {
            if (userLevel == "Beginner")
            {
                var index = Math.floor((Math.random() * beginnerExercises.length));
                $scope.workout1.push(beginnerExercises[index]);
            }
        }

        console.log($scope.workout1);

        // # 2 - Based on user's planned workouts


        // # 3 - Mix between the 2

    }
}]);
