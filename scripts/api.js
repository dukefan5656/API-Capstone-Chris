'use strict';

const API = (function () {
  
  const youtube_Key = 'AIzaSyBhyLNH7AaEkj0c6aE5FB8NMrirtnyWNhg';
  let endpoint = "https://www.googleapis.com/youtube/v3/search";
  const getReddit = function(searchTerm, callback){
    const redSettings = {
      
    }
  };

  const getImage = function(){

  };

  const getYoutube = function(searchTerm, callback){
    const settings = {
      part: 'snippet',
      q: searchTerm,
      key: youtube_Key,
      maxResults: 1,
      order: 'viewCount',
      pageToken: store.pageToken,
      videoEmbeddable: true,
      type: 'video'
    };
    console.log(settings.pageToken);
    if($('.js-more').attr('data-id') == "0"){
      settings.pageToken = store.defaultToken;
      console.log('token is undefined');
    }
    else if ($('.js-more').attr('data-id') == "1"){
      settings.pageToken = store.nextPageToken;
    } else {
      settings.pageToken = store.prevPageToken;
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