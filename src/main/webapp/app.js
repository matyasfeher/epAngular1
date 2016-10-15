var app = angular.module('viewApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/details/:id", {
                templateUrl: "views/detail.html",
                controller: "DetailController"
            })

            .otherwise({
                templateUrl: "views/list.html",
                controller: "ListController"
            });

});

app.factory("users", function ($http) {
    var users;
    if (users == null) {
        $http({method: 'GET',
            url: './datafolder/data.json'
        }).then(function successCallback(response) {
            var data = response.data.users;
            users = data;
            console.log("Succes" + users.length);
        }, function errorCallback(response) {
            console.log("Fail:" + response.statusText + " " + response.status);
        });
    }
    ;
    return{
        getUsers: function () {
            return users;
        }
    };
});

var sharedusers;
app.controller("ListController", function ($scope, $http) {
    $scope.users;
    $http({method: 'GET',
        url: './datafolder/data.json'
    }).then(function successCallback(response) {
        var data = response.data.users;
        $scope.users = data;
        sharedusers = data;
        console.log("Succes" + $scope.users.length);
    }, function errorCallback(response) {
        console.log("Fail:" + response.statusText + " " + response.status);
    });
});

app.controller("DetailController", function ($scope, $routeParams) {
    var dob =  $routeParams.id;
    var usershere = sharedusers;
    
    for(var i=0; i < usershere.length; i++){
     if(usershere[i].dob === dob){
         $scope.user = usershere[i];
     }   
    }
    
    
});

var users = [];
app.controller("UserController", function ($http, $routeParams) {
    var self = this;
    if (users.length === 0) {
        $http.get("./datafolder/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        });
    } else { //We used the cache property on the http request instead 
        self.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.id);
        self.user = users[$routeParams.id];
    }
});






