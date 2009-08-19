function(keys, values, rereduce) {
  var result = { num_replies: 0, last_reply: 0, text: "", time_created: 0, screen_name: "" };

  if(rereduce) {
    for(idx = 0; idx < values.length; idx++) {
      result.num_replies += values[idx].num_replies;

      if(values[idx].text != "") {
        result.text = values[idx].text;
      }
    
      if(values[idx].screen_name != "") {
        result.screen_name = values[idx].screen_name;
      }
      
      if(values[idx].time_created != 0) {
        result.time_created = values[idx].time_created;
      }

      if(values[idx].last_reply != 0) {
        if(result.last_reply == 0) {
          result.last_reply = values[idx].last_reply;
        } else {
          if(result.last_reply < values[idx].last_reply) {
            result.last_reply = values[idx].last_reply;
          }
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
          if(result.last_reply < values[idx].time_created) {
            result.last_reply = values[idx].time_created;
          }
        }
      }
    }
  }
  
  return result;
}