var app = angular.module('recommendWorkout', ['ui.router', 'flash']);

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

                workoutPromise: ['workouts', 'auth', function(workouts, auth) {
                    return workouts.getAll(auth.getUserId());
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

    workoutService.getAll = function(userId) {
        return $http.get('/getUserWorkouts/' + userId).success(function(data)
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

app.controller('MainCtrl', ['$scope', 'workouts', 'exercises', '$stateParams', '$window', 'auth', 'Flash', function($scope, workouts, exercises, $stateParams, $window, auth, Flash) {

    $scope.workouts = workouts.workouts;

    var userWorkouts = [];

    //console.log($scope.workouts);
    $scope.exercises = exercises.exercises;
    //console.log($scope.exercises.exercises.exercise1);

    var exercisesArray = [];
    $scope.workout1 = [];

    $scope.restTime;


    for (var exercise in $scope.exercises.exercises)
    {
        var tempObj = $scope.exercises.exercises[exercise];
        exercisesArray.push(tempObj);
    }

    var exercisesCount = exercisesArray.length;
    //console.log(exercisesArray);

    for (var exercise in $scope.workouts)
    {
        //console.log($scope.workouts[exercise]);
        var tempObj = $scope.workouts[exercise];
        userWorkouts.push(tempObj);
    }
    console.log(userWorkouts);

    $scope.workout2 = [];
    //console.log(userWorkouts);

    var plannedExercises = [];
    $scope.secondWorkoutPlanned = false;

    $scope.workout3 = [];
    $scope.thirdWorkoutPlanned = false;

    // turn the workouts into an array
    $scope.recommendWorkout = function()
    {
        console.log("Inside recommend function!");
        console.log($scope.level);
        if (!$scope.level || !$scope.intensity || !$scope.goal)
        {
            console.log("Please fill in all the fields");
            return;
        }

        $scope.userLevel = $scope.level;
        $scope.userIntensity = $scope.intensity;
        $scope.userGoal = $scope.goal;
        //console.log(goal);

        if ($scope.userLevel == "Expert")
        {
            $scope.userLevel = "";
            $scope.userIntensity = "";
            $scope.userGoal = "";
            $scope.noExercise = "Sorry, you have selected the Expert level and there are no exercises for that in my DB yet!"
            getSecondWorkout(plannedExercises);
            return;
        }


        $scope.sets;
        $scope.reps;
        $scope.numExercises;

        // optimization algorithm

        //var userLevelValue;
        //var intensityValue;





        //console.log($scope.workout1);
        getFirstWorkout();

        // # 2 - Based on user's planned workouts
        getSecondWorkout(plannedExercises);
        console.log($scope.workout2);


        //console.log($scope.workout2);

        // # 3 - Random workout
        getThirdWorkout();
        console.log($scope.workout3);

    }

    $scope.saveWorkout1 = function(workout1, sets, reps)
    {
        console.log("saveWorkout1");
        console.log(workout1);

        console.log(sets);
        var newWorkout = {};

        for (var i = 0; i < workout1.length; i++)
        {
            newWorkout["exercise" + i] = workout1[i].name;
        }
        console.log(newWorkout);
        newWorkout.title = "Workout 1";
        newWorkout.workoutSets = sets;
        newWorkout.workoutReps = reps;
        newWorkout.user = auth.getUserId();
        console.log(newWorkout.user);

        workouts.create(newWorkout);
        console.log("Workout saved!");
        $scope.successAlert(1);




    }

    $scope.saveWorkout2 = function(workout2, sets, reps)
    {
        console.log("saveWorkout2");
        console.log(workout2);

        console.log(sets);
        var newWorkout = {};

        for (var i = 0; i < workout2.length; i++)
        {
            var j = i + 1;
            newWorkout["exercise" + j] = workout2[i];
        }
        console.log(newWorkout);
        newWorkout.title = "Workout 2";
        newWorkout.workoutSets = sets;
        newWorkout.workoutReps = reps;
        newWorkout.user = auth.getUserId();
        console.log(newWorkout.user);

        workouts.create(newWorkout);
        console.log("Workout saved!");
        $scope.successAlert(2);



    }

    $scope.saveWorkout3 = function(workout3, sets, reps)
    {
        console.log("saveWorkout3");
        console.log(workout3);

        console.log(sets);
        var newWorkout = {};

        for (var i = 0; i < workout3.length; i++)
        {
            var j = i + 1;
            newWorkout["exercise" + j] = workout3[i];
        }
        console.log(newWorkout);
        newWorkout.title = "Workout 3";
        newWorkout.workoutSets = sets;
        newWorkout.workoutReps = reps;
        newWorkout.user = auth.getUserId();
        console.log(newWorkout.user);

        workouts.create(newWorkout);
        console.log("Workout saved!");




    }
    $scope.successAlert = function (value) {

       var message = '<strong>Horray!</strong> You successfully added a workout that Waldo planned!';
       Flash.create('success', message, 0);

    }



    function getFirstWorkout()
    {
        var beginnerExercises = [];
        var intermediateExercises = [];
        console.log("getting first workout");
        // userLevel - grab the exercises in the user's level
        if ($scope.userLevel == "Beginner")
        {
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

        // intensity - use it to determine the rest time in between groups of workouts
        if ($scope.userIntensity == "High")
        {
            $scope.restTime = 1;
        }
        else if ($scope.userIntensity == "Moderate")
        {
            $scope.restTime = 2;
        }
        else if ($scope.userIntensity == "Low")
        {
            $scope.restTime = 3;
        }

        // goal - look at the person's personal fitness goal (change reps and sets accordingly)
        if ($scope.userGoal== "Maximal Strength")
        {
            // set range: Higher rep range: 1 - 5, less exercises
            $scope.reps = 3;
            $scope.sets = 5;
            $scope.numExercises = 2;

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
        }

        console.log(beginnerExercises);
        console.log(intermediateExercises);

        // plan 3 workouts

        // # 1 - Based on user preferences

        // narrow down results based on user's preferences

        while (!checkIfArrayIsUnique($scope.workout1))
        {
            // make sure that you empty the array
            $scope.workout1 = [];
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
    }

    function checkIfArrayIsUnique(myArray)
    {
        // handle the case that the array has 0 elements (first iteration)
        if (myArray.length == 0)
        {
            console.log("no elements");
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
                        console.log("duplicate exercises detected!");
                        return false; // means there are duplicate values
                    }
                }
            }
        }
        return true; // means there are no duplicate values.
    }


    function getSecondWorkout(plannedExercises)
    {
        for (var i = 0; i < userWorkouts.length; i++)
        {
            if (userWorkouts[i].exercise1)
            {
                plannedExercises.push(userWorkouts[i].exercise1);
            }
            if (userWorkouts[i].exercise2)
            {
                plannedExercises.push(userWorkouts[i].exercise2);
            }
            if (userWorkouts[i].exercise3)
            {
                plannedExercises.push(userWorkouts[i].exercise3);
            }

        }

        console.log(plannedExercises);

        while (!checkIfArrayIsUnique($scope.workout2))
        {
            $scope.workout2 = [];
            // pick three random from planned exercises
            for (var i = 0; i < 3; i++)
            {
                var index = Math.floor((Math.random() * plannedExercises.length));
                console.log(plannedExercises[index]);
                $scope.workout2.push(plannedExercises[index]);

            }
            console.log($scope.workout2);
        }
        $scope.secondWorkoutPlanned = true;
    }

    function getThirdWorkout()
    {
        //console.log(plannedExercises);

        while (!checkIfArrayIsUnique($scope.workout3))
        {
            $scope.workout3 = [];
            // pick three random from planned exercises
            for (var i = 0; i < 3; i++)
            {
                var index = Math.floor((Math.random() * exercisesArray.length));
                console.log(exercisesArray[index]);
                $scope.workout3.push(exercisesArray[index]);

            }
            console.log($scope.workout3);
        }
        $scope.thirdWorkoutPlanned = true;
    }
}]);

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

}]);
