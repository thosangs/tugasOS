if (Meteor.isServer){
    Meteor.methods({
        "portExists": function(ports){
            return !!Port.findOne({port: ports});
        },
    });
}

mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      var port;
      Meteor.call("GetPort", Meteor.userId(), function(error, result){
        if(error){
          console.log(error.reason);
          return;
        }
        port = result;
        Meteor.call('RunEnv', port);
      });
    }
    
    if (state === "signUp") {
      var port = genRandomPort();
      Meteor.call('MakeEnv', port,function(err, data) {
        if (err)
          console.log(err);
        Meteor.call('RunEnv', port);
      });
    }
  }
};

function genRandomPort(){
  var maximum = 4242;
  var minimum = 4200;
  var randomPort = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  Meteor.call("portExists", randomPort, function(err, portExists){
            if (portExists)
                randomPort = genRandomPort();
        });
  return randomPort;
}

myLogoutFunc = function(error, state){
  if (!error) {
    FlowRouter.go('home');
  }
  else{
    console.log(error);
  }
};

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,},
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email', },
  pwd
]);