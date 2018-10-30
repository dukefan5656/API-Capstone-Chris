/* global store, API, $ */

'use strict';

const app = (function(){

  function handleNewItemSubmit(){
    $('form').on('click', '.submit', event => {
      event.preventDefault();
      let hold = $('.js-query').val();
      store.youtubeData.prevPageToken = undefined;
      store.youtubeData.pageToken = undefined;
      $('.slides').html('');
      $('.js-more').attr('data-id', 0);

      API.getWiki(hold, response => {
        addWikiToStore(response);
        renderWiki();
      });

      API.getReddit(hold, response => {
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
        $.each(response.items, function (i, item) {
          $('<img>').attr('src', item.media.m).appendTo('.slides');
          if (i === 7) {
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

  function addWikiToStore(wikiItems) {
    store.wikiData = wikiItems;
  }

  function generateRedditItemString(response) {
    return response.data.children.map(item => {
      return {
        title: item.data.title,
        url: item.data.url,
        description: item.data.selftext,
        image: item.data.preview.images[0].source.url
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
    return `<div class="card mb-2">
    <img class="card-img-top" src="${post.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <a href="${post.url}" class="btn btn-primary">Go to Reddit</a>
    </div>
  </div>`;
  };

  const renderWiki = function(){
    const wikiDisplay = `<li>${store.wikiData[1]}</li>
            <p>${store.wikiData[2]}</p>
            <a href=${store.wikiData[3]}>Follow Link to Wiki Page</a>`;
    $('#wiki').html(wikiDisplay);
  };

  const renderResults = function(video) {
    return `<section class="youtube-container" data-id="${video.id}">
              <h3>${video.title}</h3>
              <iframe width="560" height="315" class="youtube-video" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
              <p>${video.description}</p>
              <a href="https://www.youtube.com/channel/${video.channelId}">Follow Link to Channel</a>
            </section>
            <button type="button" class="js-fewer">Prev Video</button>
            <button type="button" class="js-more" data-id="0">Next Video</button>
    `;
  };

  function handleMoreClick(){
    $('#youtube').on('click', '.js-more', function(event){
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
    $('#youtube').on('click', '.js-fewer', function(event){
      
      event.preventDefault();
      // if($(this).attr('data-id') == '0'){
      //   $('.enableOnInput').prop('disabled', true);
      // } else { 
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
      // }
    });
  }
  

  // function onLoad(){
  //   API.getItems(response => {
  //     store.initializeStore(response);
     
  //   });
  // }
  
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
        if (currentSlide === $('.slide').length) {
          currentSlide = 1;
          $('.slides').css('margin-left', 0);
        }
      });
    }, 0);
  }

  return {
    // onLoad: onLoad,
    bindEventListeners: bindEventListeners
  };

}());


