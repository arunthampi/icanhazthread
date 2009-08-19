function(doc) {
  // This view gives all replies associated with a given thread, sorted by ascending time
  if(doc.type == 'reply') {
    emit([doc.thread_id, doc.time_created], null);
  }
}