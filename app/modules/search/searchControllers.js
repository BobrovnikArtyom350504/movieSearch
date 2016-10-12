'use strict';

angular.module('app.search.controllers', []).controller('SearchController', ['$scope', 'movieSearch', function ($scope, movieSearch) {
    $scope.search = movieSearch;
    console.log($scope.search);
    $scope.modelChange = function () {
        $scope.$emit('SEARCH_PARAMS_CHANGE');
    };
}]);
