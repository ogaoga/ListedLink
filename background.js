/* -*- coding:utf-8 -*- */
//$(function(){
// ======================================================================
  var server = 'http://icotile.ogaoga.org';
  chrome.self.onConnect.addListener(function(port, name) {
    port.onMessage.addListener(function(info, con) {
      if ( info.type == 'getUser' ) {
        var data = sessionStorage.getItem(info.data.screen_name);
        if ( data ) {
          console.log('*** use cache *** : '+info.data.screen_name);
          port.postMessage(JSON.parse(data));
        }
        else {
          console.log('!!! not use cache !!! : '+info.data.screen_name);
          var url = 'https://api.twitter.com/1/users/show.json';
          $.ajax({'type': 'GET',
                  'url': url,
                  'data': {'screen_name': info.data.screen_name},
                  'success': function(data) {
                    port.postMessage(data);
                    sessionStorage.setItem(info.data.screen_name,
                                           JSON.stringify(data));
                  },
                  'error': function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    port.postMessage();
                  },
                 });
        }
      }
      else {
      }
    });
  });

// ======================================================================
//});