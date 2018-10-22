/* global store, API, $ */

'use strict';

const app = (function(){

  function handleNewItemSubmit(){
    $('form').on('click', '.submit', event => {
      event.preventDefault();
      let hold = $('.js-query').val();
      store.youtubeData.prevPageToken = undefined;
      store.youtubeData.pageToken = undefined;
      $(".slides").html("");
      $('.js-more').attr('data-id', 0);

      API.getReddit(hold, response => {
        console.log(response);
        generateRedditItemString(response);
        const decoratedReddit = generateRedditItemString(response);
        addRedditToStore(decoratedReddit);
        displayReddit();
      });
      
      API.getYoutube(hold, response => {
        store.youtubeData.nextPageToken = response.nextPageToken;
        const decoratedVideos = generateYoutubeItemString(response);
        addVideosToStore(decoratedVideos);
        displayResults();
        
      });
      API.getImage(hold, response =>{
        let image = response.link;
        console.log(image);
        $.each(response.items, function (i, item) {
          $("<img>").attr("src", item.media.m).appendTo(".slides");
          if (i === 10) {
            return false;
          }
          // startSlider();
        });
      });
    });
  }

  const displayResults = function(){
    const htmlElements = store.youtubeData.videos.map(item => renderResults(item));
    $('#youtube').html(htmlElements);
  };

  const displayReddit = function(){
    const redditHtml = store.redditData.map(item => renderReddit(item));
    $('#reddit').html(redditHtml);
  };

  function addVideosToStore(videos) {
    store.youtubeData.videos = videos;
  }

  function addRedditToStore(items) {
    store.redditData = items;
  }

  function generateRedditItemString(response) {
    console.log(response.data.children[0].data.preview.images[0].source.url);
    return response.data.children.map(item => {
      return {
        title: item.data.title,
        url: item.data.url,
        description: item.data.selftext,
        image: item.data.preview.images
      };
    });
  }

  function generateYoutubeItemString(response) {
    return response.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelId: item.snippet.channelId
      };  
    });
  }

  const renderReddit = function(post){
    return `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <a href="${post.url}" class="btn btn-primary">Go to Reddit</a>
    </div>
  </div>`;
  };

  const renderResults = function(video) {
    return `<li data-id="${video.id}">
              <h3>${video.title}</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
              <p>${video.description}</p>
              <a href="https://www.youtube.com/channel/${video.channelId}">Follow Link to Channel</a>
            </li>
    `;
  };

  function handleMoreClick(){
    $('.js-search-form').on('click', '.js-more', function(event){
      event.preventDefault();
      console.log('hello');
      let hold = $('.js-query').val();
      let data = $('.js-more').data('id');
      data++;
      $(this).attr('data-id', data);
      API.getYoutube(hold, response => {
        store.youtubeData.pageToken = store.youtubeData.nextPageToken;
        store.youtubeData.prevPageToken = response.prevPageToken;
        store.youtubeData.nextPageToken = response.nextPageToken;
        const decoratedVideos = generateYoutubeItemString(response);
        addVideosToStore(decoratedVideos);
        displayResults();
  
      });
    });
  }

  function handleFewerClick(){
    $('.js-search-form').on('click', '.js-fewer', function(event){
      event.preventDefault();
      console.log('listening');
      let hold = $('.js-query').val();
      let data = $('.js-more').data('id');
      data--;
      $('.js-more').attr('data-id', data);
      API.getYoutube(hold, response => {
        store.youtubeData.pageToken = store.youtubeData.nextPageToken;
        store.youtubeData.prevPageToken = response.prevPageToken;
        store.youtubeData.nextPageToken = response.nextPageToken;
        const decoratedVideos = generateYoutubeItemString(response);
        addVideosToStore(decoratedVideos);
        displayResults();
      });
    });
  }

  function onLoad(){
    API.getItems(response => {
      store.initializeStore(response);
     
    });
  }
  
  function bindEventListeners(){
    handleNewItemSubmit();
    handleMoreClick();
    handleFewerClick();
  }
  

  function startSlider() {
    let width = 5000;
    let animationSpeed = 90000;
    let currentSlide = 1;
    setInterval(function() {
      $('.slides').animate({'margin-left': '-='+width}, animationSpeed, function() {
        console.log(currentSlide);
        if (currentSlide === $('.slide').length) {
          currentSlide = 1;
          $('.slides').css('margin-left', 0);
        }
      });
    }, 0);
  }
  return {
 
    onLoad: onLoad,
    bindEventListeners: bindEventListeners
  };

}());


