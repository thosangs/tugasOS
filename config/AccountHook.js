mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      console.log("SignIn Sukses");
    }
    if (state === "signUp") {
      console.log("SignUp Sukses");
    }
  }
};

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
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);