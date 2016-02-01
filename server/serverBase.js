exec = Npm.require('child_process').exec;

Meteor.publish('output',function(){
  return Replies.find({});
});

Meteor.methods({
  'InsertCommand' : function(line) {
    console.log("In command method", line);
    Fiber = Npm.require('fibers');
    exec(line, function(error, stdout, stderr) {
      console.log('Command Method', error, stdout, stderr);
      Fiber(function() {
        Replies.insert({
          message: stdout ? stdout : stderr, 
          date: new Date(),
          command: line
        }); 
      }).run();
    });}
});