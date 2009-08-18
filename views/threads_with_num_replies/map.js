function(doc) {
  // This view gets all threads and its associated replies
  if(doc.type == 'thread') {
    emit([doc._id, doc.time_created], doc);
  } else if(doc.type == 'reply') {
    emit([doc.thread_id, doc.time_created], doc);
  }
}