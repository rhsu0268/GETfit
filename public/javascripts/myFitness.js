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

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

}]);
