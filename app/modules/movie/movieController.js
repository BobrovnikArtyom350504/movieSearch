'use strict';

angular.module('app.movie.controller', []).controller('MovieController', ['$stateParams','$state', '$scope', 'tmdbApi', 'TMDB_URLS', '$sce', function ($stateParams, $state, $scope, tmdbApi, TMDB_URLS, $sce) {
    var api = tmdbApi.getInstance('24fe6e5f1bff2950b59b2f5db03a5383');

    getMovieFromServer();

    function getMovieFromServer() {
        api.getMovie($stateParams.id, function (data) {
            $scope.movie = data;
            fillMovieFields($scope.movie);
            getImagesFromServer();
            getSimilarMoviesFromServer();
            getActorsFromServer();
            getVideoFromServer();
            console.log($scope.movie);
        }, function (error) {
            console.log(error);
        });
    }

    function fillMovieFields(movie) {
        movie.backgroundUrl = api.getImageUrl('background', 'big', movie.backdrop_path);
        movie.posterUrl = api.getImageUrl('poster', 'big', movie.poster_path);
        movie.release_year = parseInt(movie.release_date);
        movie.budget = processNumber(movie.budget);
        movie.revenue = processNumber(movie.revenue);
    }

    function processNumber(number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    function getActorsFromServer() {
        api.getPeople($stateParams.id, function (data) {
            $scope.movie.actors = [];
            for (var i = 0; i < 6; i++) {
                var actor = data.cast[i];
                actor.logoUrl = api.getImageUrl('logo', 'small', actor.profile_path);
                $scope.movie.actors.push(actor);
            }
        }, function (data) {
            console.log(data);
        });
    }

    function getSimilarMoviesFromServer() {
        api.getSimilarMovies($stateParams.id, function (data) {
            var movies = data.results;
            console.log(data);
            $scope.movie.similarMovies = [];
            movies.forEach(function (movie, index) {
                if(index < 3) {
                    movie.posterUrl = api.getImageUrl('poster', 'small', movie.poster_path);
                    $scope.movie.similarMovies.push(movie);
                }
            });
            console.log($scope.movie.similarMovies);
        }, function (data) {
            console.log(data);
        });
    }

    function getVideoFromServer() {
        api.getVideos($stateParams.id, function (data) {
            if(data.results[0] && data.results[0].site ==='YouTube');
                $scope.movie.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + data.results[0].key);
                console.log($scope.movie.videoUrl);
        });
    }

    function getImagesFromServer() {
        api.getImages($stateParams.id, function (data) {
            $scope.movie.imageUrls = [];
            data.backdrops.forEach(function(image, index) {
                if(index < 3)
                    $scope.movie.imageUrls.push(api.getImageUrl('background', 'small', image.file_path));
            }) ;
        });
    }

}]);