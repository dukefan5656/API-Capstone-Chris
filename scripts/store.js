'use strict';

const store = (function(){
  return {
    redditData: [],
    wikiData: [],
    youtubeData: {
      videos: [],
      defaultToken: undefined,
      nextPageToken: undefined,
      prevPageToken: undefined,
      pageToken: undefined,
    }
  };
}());

