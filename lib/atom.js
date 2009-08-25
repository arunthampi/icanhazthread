var Atom = {
  // applies title, id, link, and updated date to the header
  header : function(data) {
    var f = <feed xmlns="http://www.w3.org/2005/Atom"/>;
    f.title = data.title;
    f.id = data.feed_id;
    f.link.@href = data.feed_link;
    f.link.@rel = "self";
    f.generator = "i.canhazthread.com Atom Feed";
    f.updated = data.updated.rfc3339();
    return f.toXMLString().replace(/\<\/feed\>/,'');
  },
  entry : function(data) {
    var entry = <entry/>;
    entry.id = data.entry_id;
    entry.title = data.title;
    entry.content = data.content;
    entry.content.@type = (data.content_type || 'html');
    entry.updated = data.updated;
    entry.author = <author><name>{data.author}</name></author>;
    return entry;
  }
};