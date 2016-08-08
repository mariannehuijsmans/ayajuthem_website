'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: './templates/home.html',
    controller: 'homeCtrl'
  });
}])

.factory('nodeService', ['$http',
                              function($http) {
                                  return {
                                      cors: function() {
                                          return $http.get('//localhost:8080/js/rows.json')
                                              .then(function(response) {
                                              return response;
                                          });
                                      }
                                  }
                              }
                             ])

.controller('homeCtrl', ['$scope', 'nodeService', function($scope, nodeService, $log) {
    
   $scope.convertText = function(text) {
//       nodeService.cors().then(function(response){
//        var cors = response.data;
       if (text != undefined) {
           if ($scope.unicode) {
            var text_to_convert = text;
            var number_of_changes = cors.length
            for (var i = 0; i<number_of_changes;i++) {
               var re = new RegExp(cors[i]["from"], 'g')
               text_to_convert = text_to_convert.replace(re, cors[i]["to"]);
           }
           $scope.converted_text = text_to_convert
        } else if (!$scope.unicode) {
           var text_to_convert = text;
           var number_of_changes = cors.length
           for (var i = 0; i<number_of_changes;i++) {
               var re = new RegExp(cors[i]["to"], 'g')
               text_to_convert = text_to_convert.replace(re, cors[i]["from"]);
           }
           $scope.converted_text = text_to_convert
       }
   }
}
}]);
