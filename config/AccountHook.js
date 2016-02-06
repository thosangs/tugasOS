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
    FlowRouter.go('userhome');
  }
  else{
    console.log(error);
  }
};