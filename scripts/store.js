'use strict';

const store = (function(){
  
  
  return {
    redditData: [],
    youtubeData: {
      videos: [],
      defaultToken: undefined,
      nextPageToken: undefined,
      prevPageToken: undefined,
      pageToken: undefined,
    }
  };
}());

