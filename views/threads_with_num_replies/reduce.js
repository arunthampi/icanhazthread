function(keys, values, rereduce) {
  var output = {};
  output.num_replies = 0;

  if(rereduce) {
    for(idx in values) {
      if (values[idx].num_replies !== undefined) {
        output.num_replies += values[idx].num_replies;
      } else if(values[idx].thread !== undefined) {
        output.thread = values[idx].thread;
      } else if(values[idx].screen_name !== undefined) {
        output.screen_name = values[idx].screen_name;
      } else if(values[idx].time_created !== undefined) {
        output.time_created = values[idx].time_created;
      }
    }
  } else {
    for (idx in values) {
      if (values[idx].type == 'thread') {
        output.thread = values[idx].text;
        output.screen_name = values[idx].screen_name;
        output.time_created = values[idx].time_created;
      } else if (values[idx].type == 'reply') {
        output.num_replies += 1;
      }
    }
  }
  
  return output;
}