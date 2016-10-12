'use strict';

angular.module('app', [
    'searchModule',
    'tmdbApiModule',
    'ui.router',
    'uiRouterStyles',
    'moviesModule',
    'movieModule',
    'ui.multiselect'
]).config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $stateProvider.state('movies', {
        url: '/movies',
        templateUrl: '/modules/movies/movies.html',
        controller: 'MoviesController',
        data: {
            css: ['/modules/movies/styles/movies.css']
        }
    });

    $stateProvider.state('movie', {
        url: '/movie/:id',
        templateUrl: '/modules/movie/movie.html',
        controller: 'MovieController',
        data: {
            css: ['/modules/movie/styles/movie.css']
        }

    });
}]).run(['$state', function ($state) {
    $state.go('movies');
}]).constant('API_KEY', '24fe6e5f1bff2950b59b2f5db03a5383').directive('backImg', function(){
    return function(scope, element, attrs) {
        var imgNotFoundUrl = 'modules/movies/images/img-not-found.svg';
        attrs.$observe('backImg', function (posterUrl) {
            element.css({
                'background-image': `url(${posterUrl})`,
                'background-color': '#009688'
            });
        });
    };
});