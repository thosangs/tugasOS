exec = Npm.require('child_process').exec;
//mukhlis
var zerorpc = Meteor.npmRequire("zerorpc");
var client = new zerorpc.Client();

Meteor.publish('output',function(){
  return Replies.find({user:this.userId});
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
      Meteor.call("MakePort",port);
      makePy(port);
    },

    'MakePort' : function(port){
      Port.insert({user:this.userId,port: port});
    },

    'GetPort' : function(user){
      port = Port.findOne({user:user});
      return port.port;
    },

    'Run' : function(codePath,type){
      var zerorpc = Meteor.npmRequire("zerorpc");
      var port = Meteor.call("GetPort",this.userId);
      var func = type == 'py' ? 'pycom' : 'rcom' ;
      var respon = "";
      var UserID = Meteor.userId();

      client.connect("tcp://127.0.0.1:"+port);
      client.invoke(func, codePath, function(error, res, more) {
          if(error) {
              console.log(error);
          } else {
              respon = respon + res;
          }

          if(!more) {
            Fiber = Npm.require('fibers');
            Fiber(function() {
              Replies.insert({
                message: respon, 
                date: new Date(),
                user: UserID,
                command: "Running "+func
              });
            }).run();
          }
      });
    }
  });