var app = angular.module('GETfit', ['ui.router']);
app.config([

    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })

            .state('exercises', {
                url: '/exercises/{id}',
                templateUrl: '/exercises.html',
                controller: 'ExercisesCtrl'


            });

        $urlRouterProvider.otherwise('home');
    }

]);
app.factory('exercises', [function() {

    var activities = {
        exercises: []
    };
    return activities;

}]);

app.controller('MainCtrl', ['$scope', 'exercises', function($scope, exercises) {

    /*
    $scope.workoutPlan = [
        {title: 'Bench Press', set: 1},
        {title: 'Hammer Curl', set: 2},
        {title: 'Seated Concentration Curl', set: 1},
        {title: 'Palms-In Shoulder Press', set: 2},
        {title: 'Two-Arms Triceps Extension', set: 2}
    ];
    */



    $scope.addExercise = function() {

        $scope.workoutPlan = exercises.exercises;

        if (!$scope.title || $scope.title === '')
        {
            return;
        }

        if (!$scope.set || $scope.set === '')
        {
            return;
        }
        $scope.workoutPlan.push({
            title: $scope.title,
            set: $scope.set,
            information: [
                {rep: 8, set: 2}
            ]

        });


        //$scope.workoutPlan.push({title: $scope.title, set: $scope.set});
        $scope.title = '';
        $scope.set = '';
    }

}]);

app.controller('ExercisesCtrl', ['$scope', '$stateParams', 'exercises', function($scope, $stateParams, exercises) {

    $scope.exercise = exercises.exercises[$stateParams.id];

    $scope.addFitnessGoal = function()
    {
        $scope.exercise.information.push({
            rep: $scope.rep,
            set: $scope.set
        });

        $scope.rep = '';
        $scope.set = '';
    }
}]);
