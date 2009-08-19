function(doc) {
  // This view gets all threads and its associated replies
  if(doc.type == 'thread') {
    emit([doc._id, 0], null);
  } else if(doc.type == 'reply') {
    emit([doc.thread_id, 1, doc.time_created], null);
  }
}