'use strict';

const API = (function () {
  
  const youtube_Key = 'AIzaSyBhyLNH7AaEkj0c6aE5FB8NMrirtnyWNhg';
  let endpoint = "https://www.googleapis.com/youtube/v3/search";
  const getReddit = function(searchTerm, callback){
    const redSettings = {
      
    }
  };

  const getImage = function(searchTerm, callback){
    const imageSettings = {
      tags: searchTerm,
      tagmode: "any",
      format: "json"
    };
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", imageSettings, callback);
  };

  const getYoutube = function(searchTerm, callback){
    const settings = {
      part: 'snippet',
      q: searchTerm,
      key: youtube_Key,
      pageToken: store.youtubeData.pageToken,
      maxResults: 1,
      order: 'viewCount',
      videoEmbeddable: true,
      type: 'video'
    };
    console.log(settings.pageToken);
    if($('.js-more').attr('data-id') == "0"){
      settings.pageToken = store.youtubeData.defaultToken;
    }
    else if ($('.js-more').attr('data-id') == "1"){
      settings.pageToken = store.youtubeData.nextPageToken;
    } else {
      settings.pageToken = store.youtubeData.prevPageToken;
    }
      $.getJSON(endpoint, settings, callback);
    console.log(settings);
  };

  const getWiki = function(){

  };

  const getTwitter = function(){
  
  };


  return{
    getReddit,
    getImage,
    getYoutube,
    getWiki,
    getTwitter
  };
})();