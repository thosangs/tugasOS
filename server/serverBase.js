exec = Npm.require('child_process').exec;
//mukhlis

Meteor.publish('output',function(){
  return Replies.find({});
});

Meteor.methods({
  'InsertCommand' : function(line) {
    console.log("In command method", line);
    Fiber = Npm.require('fibers');
    //file = save-text-to-file
    exec(line, function(error, stdout, stderr) {
      console.log('Command Method', error, stdout, stderr);
      Fiber(function() {
        Replies.insert({
          message: stdout ? stdout : stderr, 
          date: new Date(),
          command: line
        }); 
      }).run();
    });},
    'CekPython' : function(){
      var zerorpc = Meteor.npmRequire("zerorpc");

      var client = new zerorpc.Client();
      client.connect("tcp://127.0.0.1:4242");

      client.invoke("hello", "Jambas!", function(error, res, more) {
          console.log(res);
      });
    },

    "writefiletoPath" : function(path,text){
       var writer = Meteor.npmPackage('writefile');
       writer(path,text);
       console.log("fileWrited to" + path);
    }
});
