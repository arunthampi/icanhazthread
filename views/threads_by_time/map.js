function(doc) {
  // This view gives all threads which are in a specific time-frame
  if(doc['couchrest-type'] == 'HazChatThread') {
    emit(doc.updated_at, doc);
  }
}