/* global store, API, $ */

'use strict';

const app = (function(){

  function handleNewItemSubmit(){
    $('form').on('click', 'button', event => {
      console.log('listening');
      event.preventDefault();
      let hold = $('.js-query').val();
      store.prevPageToken = undefined;
      store.pageToken = undefined;
      $('.js-more').attr('data-id', 0);
      API.getYoutube(hold, response => {
        store.nextPageToken = response.nextPageToken;
        const decoratedVideos = generateYoutubeItemString(response);
        addVideosToStore(decoratedVideos);
        displayResults();
        render();
      });
    });
  }

  const displayResults = function(){
    const htmlElements = store.youtubeData.videos.map(item => renderResults(item));
    $('#youtube').html(htmlElements);
  };

  function addVideosToStore(videos) {
    store.youtubeData.videos = videos;
  }

  function generateYoutubeItemString(response) {
    console.log(response);
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

  const renderResults = function(video) {
    return `<li data-id="${video.id}">
              <h3>${video.title}</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
              <p>${video.description}</p>
              <a href="https://www.youtube.com/channel/${video.channelId}">Follow Link to Channel</a>
            </li>
    `;
  };

  function handleExpand(){

  }

  function render(){

  }

  function onLoad(){
    API.getItems(response => {
      store.initializeStore(response);
      render();
    });
  }
  
  function bindEventListeners(){
    handleNewItemSubmit();
  }
  

  return {
    render: render,
    onLoad: onLoad,
    bindEventListeners: bindEventListeners
  };

}());


