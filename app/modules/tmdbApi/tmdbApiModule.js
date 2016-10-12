'use strict';

angular.module('tmdbApiModule', ['app.tmdbApi.services']).constant('TMDB_URLS', {
    'API_URL': 'http://api.themoviedb.org/3/',
    'poster':{
        'url': 'http://image.tmdb.org/t/p/',
        'sizes': [{'small': 'w185'}, {'big': 'w342'}]
    },
    'background':{
        'url': 'http://image.tmdb.org/t/p/',
        'sizes': [{'small':'w780'}, {'big': 'w1280'}]
    },
    'logo': {
        'url': 'http://image.tmdb.org/t/p/',
        'sizes': [{'small': 'w92'}]
    }
});
