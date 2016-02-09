FlowRouter.route('/', {
  name:'home',
  action() {
      BlazeLayout.render("landing", {content: "homepage"});}
  }
);

FlowRouter.route('/UserHome', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "editor"});
  }
});

FlowRouter.notFound = {
    action: function() {
		  BlazeLayout.render("landing", {content: "pagenotfound"});
    }
};

FlowRouter.route('/403', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "pageforbidden"});
  }
});