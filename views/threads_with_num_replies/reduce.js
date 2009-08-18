function(keys, values, rereduce) {
  var result = { num_replies: 0, last_reply: 0, text: "", time_created: 0 };

  if(rereduce) {
    for(idx = 0; idx < values.length; idx++) {
      result.num_replies += values[idx].num_replies;
      result.text = values[idx].text;
      result.screen_name = values[idx].screen_name;
      result.time_created = values[idx].time_created;

      if(result.last_reply == 0) {
        result.last_reply = values[idx].time_created;
      } else {
        if(result.last_reply > values[idx].time_created) {
          result.last_reply = values[idx].time_created;
        }
      }
    }
  } else {
    
    for(idx = 0; idx < values.length; idx++) {
      if(values[idx].type == 'thread') {
        result.text = values[idx].text;
        result.screen_name = values[idx].screen_name;
        result.time_created = values[idx].time_created;
        
      } else if(values[idx].type == 'reply') {
        result.num_replies += 1;
        
        if(result.last_reply == 0) {
          result.last_reply = values[idx].time_created;
        } else {
          if(result.last_reply > values[idx].time_created) {
            result.last_reply = values[idx].time_created;
          }
        }
      }
    }
  }
  
  return result;
}