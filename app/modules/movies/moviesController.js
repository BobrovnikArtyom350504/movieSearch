'use strict';

angular.module('app.movies.controller', []).controller('MoviesController', ['$scope', 'tmdbApi', 'API_KEY', 'TMDB_URLS', 'movieSearch', '$window', function ($scope, tmdbApi, API_KEY, TMDB_URLS, movieSearch, $window) {
    var api = tmdbApi.getInstance(API_KEY);
    var genresList = [];
    var page = 1;

    setGenresList(function () {
    }, function (error) {
        console.log(error);
    });

    $scope.movies = [];

    addMovies();

    $scope.$on('SEARCH_PARAMS_CHANGE', function () {
        page = 1;
        cleanMoviesCollection();
        addMovies();
    });

    setOnBottomScrollListener();

    function setGenresList(onSuccess, onError) {
        api.getGenresList(function (genres) {
            genresList = genres;
            onSuccess(genres);
        }, function (error) {
            onError(error);
        });
    }

    function getGenresById(ids) {
        var genres = [];
        ids.forEach(function (id) {
            for (var i in genresList)
                if(genresList[i].id === id) {
                    genres.push(genresList[i]);
                    break;
                }
        });
        return genres;
    }

    function getMovieGenres (movie, onSuccess, onError) {
        if(genresList === undefined) {
            setGenresList(function() {
                onSuccess(getGenresById(movie.genre_ids));
            }, function (error) {
                console.log(error);
            });

        } else onSuccess(getGenresById(movie.genre_ids));
    }

    function addMovies () {
        var params;
        if(typeof movieSearch.getParams() !== 'undefined' && params !== null )
            params = movieSearch.getParams();
        params.page = page;
        api.discoverMovies(params, function (movies) {
            movies.forEach(function (movie) {
                getMovieGenres(movie, function (genres) {
                    movie.genres = genres;
                }, function (error) {
                    console.log(error);
                });
                movie.posterUrl = movie.posterUrl = api.getImageUrl('poster', 'small', movie.poster_path);
            });
            [].push.apply($scope.movies, movies);
            console.log($scope.movies);
        }, function (error) {console.log(error);});
    }

    function cleanMoviesCollection() {
        $scope.movies = [];
    }

    function setOnBottomScrollListener() {
        angular.element($window).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            var windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                ++page;
                addMovies();
            }
        });
    }


}]);
