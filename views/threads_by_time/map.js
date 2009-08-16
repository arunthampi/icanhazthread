function(doc) {
  // This view gives all threads which are in a specific time-frame
  if(doc.type == 'thread') {
    emit(doc.time_created, doc);
  }
}