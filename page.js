$(function(){
// ======================================================================

  //
  // initialize
  //
  var showListed = function(screenName, stats) {
    // console.log('== show2 ===');
    if ( screenName.length > 0 && stats ) {
      var connection = chrome.extension.connect();
      // show listed count
      connection.onMessage.addListener(function(data, con) {
        var str = '<li class="listed"><a href="/#!/'
                  + screenName
                  + '/lists/memberships" data-element-term="listed_stats"><strong>'
                  + ((data.listed_count) ? data.listed_count : 'N/A')
                  + '</strong> Listed</a></li>';
        stats.find('.listed').remove();
        stats.append(str);
      });
      // request user data
      connection.postMessage({type: 'getUser',
                              data: { 'screen_name': screenName }});
    }
  }

  // node inserted
  $(document).bind('DOMNodeInserted', function(event) {
    /*                       
    if ( event.target.className != '_timestamp' ) {
      console.log('-----');
      console.log(event);
      console.log(event.target);
      console.log($(event.target));        
      //console.log(event.target.className);
    }
     */
    if ( event.target.className == 'module mini-profile component' ) {
      // ====== home left top ======
      var target = $(event.target);
      var screenName = target.find('.js-mini-current-user').attr('data-screen-name');
      var stats = target.find('.js-mini-profile-stats');
      showListed(screenName, stats);
    }
    else if ( event.target.className == '' ) {
      var target = $(event.target).find('.profile-card');
      if ( target.length > 0 ) {
        // ====== user's page top ======
        // console.log('user page top inserted');
        var screenName = target.find('.js-actionable-user').attr('data-screen-name');
        var stats = target.find('.js-mini-profile-stats');
        showListed(screenName, stats);
      }
    }
    else if ( event.target.className == 'component' ) {
      var target = $(event.target);
      if ( target.find('.profile-modal').length > 0 ) {
        // ====== profile popup ======
        var screenName = target.find('.js-screen-name').text().substring(1);
        var stats = target.find('.js-mini-profile-stats');
        showListed(screenName, stats);
      }
    }
    else {
    }
  });

  $(document).ready(function(){
    // prerendared
    var target = $('.profile-card');
    if ( target.length > 0 ) {
      // console.log('user page top prerendared');
      // ====== user's page top ======
      var screenName = target.find('.js-actionable-user').attr('data-screen-name');
      var stats = target.find('.js-mini-profile-stats');
      showListed(screenName, stats);
    }
  });

// ======================================================================
});
