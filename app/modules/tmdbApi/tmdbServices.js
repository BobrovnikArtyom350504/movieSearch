'use strict';

angular.module('app.tmdbApi.services', []).factory('tmdbApi',['TMDB_URLS', '$http', function (TMDB_URLS, $http) {
    return {
        getInstance: function (apiKey) {
            var _apiKey = apiKey;

            return {
                getGenresList: function (onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'genre/movie/list', {
                        params: {
                            api_key: _apiKey
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data.genres);
                    }).error(function (data) {
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                discoverMovies: function (params, onSuccess, onError) {
                    var _params = {};
                    if(params !== undefined && params !== null)
                        _params = params;
                    _params.api_key = _apiKey;
                    $http.get(TMDB_URLS.API_URL + 'discover/movie', {
                        params: _params
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data.results);
                    }).error(function (data) {
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                getMovie: function (id, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'movie/' + id, {
                        params: {
                            api_key: _apiKey
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    }) ;
                },

                getPeople: function (movieId, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'movie/' + movieId + '/credits', {
                        params: {
                            api_key: _apiKey
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                getImages: function (movieId, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'movie/' + movieId + '/images', {
                        params: {
                            api_key: _apiKey,
                            'movie_id': movieId,
                            'include_image_language': 'null'
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                getSimilarMovies : function (movieId, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'movie/' + movieId + '/similar', {
                        params: {
                            api_key: _apiKey,
                            'movie_id': movieId,
                            'page': '1'
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },
                getVideos : function (movieId, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'movie/' + movieId + '/videos', {
                        params: {
                            api_key: _apiKey,
                            'movie_id': movieId
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                searchMovies : function (string, onSuccess, onError) {
                    $http.get(TMDB_URLS.API_URL + 'search/movie', {
                        params: {
                            api_key: _apiKey,
                            'query': string,
                            'language': 'en-US'
                        }
                    }).success(function (data) {
                        if(onSuccess !== null && onSuccess !== undefined)
                            onSuccess(data.results);
                    }).error(function(data){
                        if(onError !== null && onError !== undefined)
                            onError(data);
                    });
                },

                getImageUrl: function (type, size, urlPart) {
                    for(var i in TMDB_URLS[type].sizes) {
                        if(TMDB_URLS[type].sizes[i].hasOwnProperty(size))
                            size = TMDB_URLS[type].sizes[i][size];
                    }
                    return TMDB_URLS[type].url + size + urlPart;
                }

            };
        }
    };
}]);