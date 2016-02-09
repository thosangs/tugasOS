if (Meteor.isServer){
    Meteor.methods({
        "portExists": function(ports){
            return !!Meteor.users.findOne({port: ports});
        },
    });
}

mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      Meteor.call('RunEnv', users.port);
    }
    if (state === "signUp") {
      var port = genRandomPort();
      Meteor.users.update({_id:this.userId}, {$set: {port: port}});
      Meteor.call('MakeEnv', port,function(err, data) {
        if (err)
          console.log(err);
        Meteor.call('RunEnv', port);
      });
    }
  }
};

function genRandomPort(){
  var maximum = 4200;
  var minimum = 4242;
  var randomPort = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  Meteor.call("portExists", randomPort, function(err, portExists){
            if (portExists)
                randomPort = genRandonPort();
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