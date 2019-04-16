# One Stop Shop

This app utilizes several web APIs to collect data based on a search topic provided by the user. I made this app to be able to quickly collect
information from the sites I most commonly go to when searching a topic. 

![landing](https://user-images.githubusercontent.com/34799623/56250814-eb386c00-607e-11e9-8612-c2f5d51de49e.jpg)

For example, if you use "Australia" as a search term, the next page will display Flikr images across the top header, the top 5 current Reddit
posts about the topic, the most relevant headline for the Wiki page, and a YouTube video with the ability to scroll
through hundreds of videos available based on the topic.

![search](https://user-images.githubusercontent.com/34799623/56250818-ed9ac600-607e-11e9-8323-e3abd586ccab.jpg)

Links on the page are available for each Reddit post, the Wiki page, the Channel of the current YouTube video, and the YouTube video itself. 

  ### Sample Call:

    $('form').submit('.submit', event => {
      event.preventDefault();
      let hold = $('.js-query').val();
      store.youtubeData.prevPageToken = undefined;
      store.youtubeData.pageToken = undefined;
      $('.slides').html('');
      $('.js-fewer').hide();

      API.getWiki(hold, response => {
        addWikiToStore(response);
        renderWiki();
      });
      
 #### API.getWiki is defined as:
 
   `let wikiEnpoint = 'https://www.wikipedia.org/w/api.php?callback=?';`
 
    const getWiki = function(searchTerm, callback) {
        const wikiSettings = {
        action: 'opensearch',
        format: 'json',
        limit: 1,
        search: searchTerm
       }
        $.getJSON(wikiEnpoint, wikiSettings, callback);
      };

### Skills Used:
  1. Semantic HTML
  2. CSS w/ Flexbox
  3. Async Javascript
  4. AJAX
  5. jQuery
  6. Web APIs
  7. A11Y
  8. Responsive Mobile-First Design
  9. Modularization
  10. IIFE

#### Github: https://github.com/dukefan5656/API-Capstone-Chris

#### Live Site: https://one-stop-shop-app.herokuapp.com/index.html
