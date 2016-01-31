var app = angular.module('myFitness', ['ui.router']);

console.log("Inside myfitness.js!");

app.config([
    '$stateProvider',
    function($stateProvider)
    {
        $stateProvider.state('myFitness', {
            url: '',
            templateUrl: '/myFitness.html',
            controller: 'MainCtrl'

        });
    }

]);




app.controller('MainCtrl', ['$scope', function($scope) {

    $scope.updateProfile = function(user)
    {
        $scope.master = {};
        //$scope.name = $scope.name;
        $scope.master.name = $scope.user.name;
        $scope.master.age = $scope.user.age;
        $scope.master.heightFt = $scope.user.heightFt;
        $scope.master.heightIn = $scope.user.heightIn;
        $scope.master.weight = $scope.user.weight;

        var top = $scope.user.weight * 703;
        var bottom = parseInt( $scope.user.heightFt * 12 ) + parseInt( $scope.user.heightIn );
        var bottom = bottom * bottom;

        $scope.master.bmi = Math.round( top / bottom );

        $scope.master.fitnessGoal = $scope.user.fitnessGoal;

        $scope.user.name = '';
        $scope.user.age = '';
        $scope.user.heightIn = '';
        $scope.user.heightFt = '';
        $scope.user.weight = '';
        $scope.user.bmi = '';
        $scope.user.fitnessGoal = '';

    }



}]);
