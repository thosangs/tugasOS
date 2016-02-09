exec = Npm.require('child_process').exec;
//mukhlis
var zerorpc = Meteor.npmRequire("zerorpc");
var client = new zerorpc.Client();

Meteor.publish('output',function(){
  return Replies.find({_id:this.userId});
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
          user: this.userId,
          command: line
        }); 
      }).run();
    });
  },

    "writefiletoPath" : function(path,text){
       var writer = Meteor.npmPackage('writefile');
       writer(path,text);
       console.log("fileWrited to" + path);
    },

    'RunEnv' : function(port){
      Meteor.call('InsertCommand', 'python '+PATH+'/user/'+port+'.py &');
      client.connect("tcp://127.0.0.1:"+port);
    },

    'MakeEnv' : function(port){
      makePy(port);
    },

    'Run' : function(codePath,type){
      var zerorpc = Meteor.npmRequire("zerorpc");
      var port = Meteor.users.findOne(this.userId).port;
      console.log('port : '+port);
      var func = type == 'py' ? 'pycom' : 'rcom' ;
      client.connect("tcp://127.0.0.1:"+port);
      client.invoke(func, codePath, function(error, res, more) {
          console.log(res);
          
          Fiber = Npm.require('fibers');
          Fiber(function() {
            Replies.insert({
              message: res, 
              date: new Date(),
              user: this.userId,
              command: 'Running '+func+' at '+date});
          });
      });
    }
  });