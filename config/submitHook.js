var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      console.log("SignIn Sukses");
    }
    if (state === "signUp") {
      console.log("SignUp Sukses");
    }
  }
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});