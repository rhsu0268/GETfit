'use strict';

app.factory('auth', ['$http', '$window', function($http, $window)
{

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
