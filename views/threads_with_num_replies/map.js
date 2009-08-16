function(doc) {
  // This view gets all threads and its associated replies
  if(doc.type == 'thread') {
    emit([doc._id, 0], doc);
  } else if(doc.type == 'reply') {
    emit([doc.thread_id, 1], doc);
  }
}