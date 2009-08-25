function(head, req) {
  // !code vendor/couchapp/date.js
  // !code lib/atom.js

  // The URL to access this is at:
  // http://localhost:5984/hazchat/_design/icanhazthread/_list/thread/thread_with_replies?endkey=["1250694088-iamclovin",2]&include_docs=true&startkey=["1250694088-iamclovin"]&format=true
  
  function makeAbsolute(req, path) {
    return 'http://' + req.headers.Host + path;
  };
  
  provides("atom", function() {
    var row = getRow();
    
    send("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
    
    // The feed header is the actual thread itself, everything else after it are replies.
    var feedHeader = Atom.header({
      updated : (row ? new Date(row.doc.time_created * 1000) : new Date()),
      title : row.doc.text,
      feed_id : makeAbsolute(req, "/t/" + row.doc['_id']),
      feed_link : makeAbsolute(req, "/t/" + row.doc['_id'] + "/atom.xml")
    });
    
    send(feedHeader);

    if(row) {
      do {
        var created_time = new Date(row.doc.time_created * 1000);
        var content = "By @" + row.doc.screen_name + ". Reply was made at " + created_time + ".";
                      
        var feedEntry = Atom.entry({
          entry_id : makeAbsolute(req, "/t/" + row.key),
          title : row.doc.text,
          content : content,
          updated : created_time.rfc3339(),
          author : "@" + row.doc.screen_name
        });
        // send the entry to client
        send(feedEntry);
      } while(row = getRow());
    }
    
    return "</feed>";
  });
};