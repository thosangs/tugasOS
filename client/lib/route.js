FlowRouter.route('/', {
  name:'home',
  action() {
      BlazeLayout.render("landing", {content: "homepage"});}
  }
);

FlowRouter.route('/UserHome', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "verifyLogin"});
  }
});

FlowRouter.route('/login', {
  name:'login',
  action() {
    if(!Meteor.userId())
      BlazeLayout.render("landing", {content: "login"});
    else FlowRouter.go('userhome');
  }
});

FlowRouter.notFound = {
    action: function() {
		  BlazeLayout.render("landing", {content: "pagenotfound"});
    }
};

FlowRouter.route('/403', {
  name:'forbidden',
  action() {
    BlazeLayout.render("landing", {content: "pageforbidden"});
  }
});