angular.module('Application.Controllers', [])

  .controller("RichlistController", ["$scope", "$timeout", function($scope, $timeout) {
        $scope.richlist = {};
        $.get("/api/richlist")
          .then(function(data) {
              $timeout(function() {
                  $scope.richlist = data.richlist;
              })
          });
  }])
