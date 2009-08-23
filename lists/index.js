function(head, req) {
  // !code vendor/couchapp/date.js
  // !code lib/atom.js

  // The URL to access this is at:
  // http://localhost:5984/hazchat/_design/icanhazthread/_list/index/threads_with_num_replies?format=atom&descending=true&group_level=1
  
  function makeAbsolute(req, path) {
    return 'http://' + req.headers.Host + path;
  };
  
  provides("atom", function() {
    var row = getRow();
    
    // generate the feed header
    var feedHeader = Atom.header({
      updated : (row ? new Date(row.value.time_created * 1000) : new Date()),
      title : 'Latest threads from i.canhazthread.com',
      feed_id : makeAbsolute(req, "/"),
      feed_link : makeAbsolute(req, "?format=atom")
    });
    
    send(feedHeader);
    
    if(row) {
      do {
        var created_time = new Date(row.value.time_created * 1000);
        var content = "This thread was started at " +  created_time + " by <a href=\"http://twitter.com/" +
                      row.value.screen_name + ">" + row.value.screen_name + "</a>.";

        if(row.value.num_replies > 0) {
          content += " This thread has " + row.value.num_replies + " replies and the last reply was made at " +
                      new Date(row.value.last_reply * 1000);
        } else {
          content += " No one has replied to this thread yet.";
        }

        var feedEntry = Atom.entry({
          entry_id : makeAbsolute(req, "/t/" + row.value.time_created + "-" + row.value.screen_name),
          title : row.value.text,
          content : content,
          updated : created_time.rfc3339(),
          author : "@" + row.value.screen_name
        });
        // send the entry to client
        send(feedEntry);
      } while(row = getRow());
    }
    
    return "</feed>";
  });
};