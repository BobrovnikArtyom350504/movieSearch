'use strict';

angular.module('app.search.services', []).factory('movieSearch', ['tmdbApi', 'API_KEY', function (tmdbApi, API_KEY) {
    var api = tmdbApi.getInstance(API_KEY);
    var search = {};
    var genres = {};
    var sortTypes = {
        popularity: 'popularity.desc',
        date: 'release_date.desc',
        rating: 'vote_average.desc',
        votes: 'vote_count.desc'
    };

    search.sortTypes = sortTypes;
    search.getParams = function () {
        var params = {};
        params.with_genres = search.selectedGenre;
        params.sort_by = search.selectedSortType;
        if(search.ratingBound)
            params['vote_average.gte'] = search.ratingBound;
        return params;
    };

    api.getGenresList(function (genres) {
        search.genres = genres;
    }, function () {});
    return search;
}]);