function(head, req) {
  // !code vendor/couchapp/date.js
  // !code lib/atom.js
  
  provides("atom", function() {
    var row = getRow();
    
    // generate the feed header
    var feedHeader = Atom.header({
      updated : (row ? new Date(row.value.time_created) : new Date()),
      title : 'Latest threads from i.canhazthread.com',
      feed_id : "http://localhost:3000",
      feed_link : "http://localhost:3000?format=atom"
    });
    
    send(feedHeader);
    
    if(row) {
      do {
        var created_time = new Date(row.value.time_created);
        var content = "Thread created at " +  created_time + ".";

        if(row.value.num_replies > 0) {
          content += " This thread has " + row.value.num_replies + " replies and the last reply was made at " +
                      new Date(row.value.last_reply);
        } else {
          content += "No one has replied to this thread yet.";
        }

        var feedEntry = Atom.entry({
          entry_id : "http://localhost:3000/t/" + row.value.time_created + "-" + row.value.screen_name,
          title : row.value.text,
          content : content,
          updated : new Date(row.value.time_created).rfc3339(),
          author : "@" + row.value.screen_name
        });
        // send the entry to client
        send(feedEntry);
      } while(row = getRow());
    }
    
    return "</feed>";
  });
};