exec = Npm.require('child_process').exec;
  Meteor.methods({
    'command' : function(line) {
      console.log("In command method", line);
      Fiber = Npm.require('fibers');
      exec(line, function(error, stdout, stderr) {
        console.log('Command Method', error, stdout, stderr);
        Fiber(function() {
          Replies.remove({});
          var replyId = Replies.insert({message: stdout ? stdout : stderr});
          return replyId;  
        }).run();
      }); 
    }
  });