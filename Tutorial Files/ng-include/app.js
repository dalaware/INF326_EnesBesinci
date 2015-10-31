angular.module('githubViewer', [])
	.controller('MainController', function($scope, $http){

		/* http servislerinde promis olayını kullanmayı unutma */
		var onUserComplete = function(response){
			$scope.user = response.data;
			$http.get($scope.user.repos_url)
				.then(onRepos, onError)
		};

		var onRepos = function(response){
			$scope.repos = response.data;
		}

		var onError = function(reason){
			$scope.error = "Could not fetch the data."
		};

		$scope.search = function(username){

			$http.get("https://api.github.com/users/" + username)
				.then(onUserComplete, onError);
		};

		$scope.username="angular";
		$scope.repoSortOrder = "-stargazers_count";

	});

	//app.controller("MainController", ["$scope", "$http", MainController]);

/* THIS METHOD SUCKS
(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function($scope, $http){

		var onUserComplete = function(response){
			$scope.user = response.data;
		}

		var onError = function(reason){
			$scope.error = "Could not fetch the URL"
		}


		$http.get("https://api.github.com/users/dalaware")
			.then(onUserComplete, onError);
	};

	app.controller("MainController", ["$scope", "$http" MainController]);


}());
*/