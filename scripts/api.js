'use strict';

const API = (function () {
  
  const youtube_Key = 'AIzaSyBhyLNH7AaEkj0c6aE5FB8NMrirtnyWNhg';
  let youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search';
  let flickrEndpoint = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
  let redditEndpoint = 'http://www.reddit.com/r/all/search.json?';
  let wikiEnpoint = 'https://www.wikipedia.org/w/api.php?callback=?';

  const getWiki = function(searchTerm, callback) {
   const wikiSettings = {
     action: 'opensearch',
     format: 'json',
    limit: 1,
    search: searchTerm
   }
    $.getJSON(wikiEnpoint, wikiSettings, callback);
  };

  const getReddit = function(searchTerm, callback){
    const redSettings = {
      q: searchTerm,
      limit: 2,
      sort: 'hot',
      t: 'all'
    };
    $.getJSON(redditEndpoint, redSettings, callback);
  };

  const getImage = function(searchTerm, callback){
    const imageSettings = {
      tags: searchTerm,
      tagmode: 'any',
      format: 'json'
    };
    $.getJSON(flickrEndpoint, imageSettings, callback).done(function (result, status, xhr) {
    });
  };

  const getYoutube = function(searchTerm, callback){
    const settings = {
      part: 'snippet',
      q: searchTerm,
      key: youtube_Key,
      pageToken: store.youtubeData.pageToken,
      maxResults: 1,
      order: 'relevance',
      videoEmbeddable: true,
      type: 'video'
    };
    if($('.js-more').attr('data-id') == '0'){
      settings.pageToken = store.youtubeData.defaultToken;
    }
    else if ($('.js-more').attr('data-id') == '1'){
      settings.pageToken = store.youtubeData.nextPageToken;
    } else {
      settings.pageToken = store.youtubeData.prevPageToken;
    }
    $.getJSON(youtubeEndpoint, settings, callback);
  };



  return{
    getReddit,
    getImage,
    getYoutube,
    getWiki,
  };
})();