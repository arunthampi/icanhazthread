function(doc) {
  // This view gives all changes in the doc store, regardless of whether it's a thread or a reply
  emit(doc.time_created, null);
}