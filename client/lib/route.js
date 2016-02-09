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
    // Subscriptions registered here don't have Fast Render support.
    action: function() {
//namanya pastiin lagi 
		BlazeLayout.render("landing", {content: "pagenotfound"});
    }
};

FlowRouter.route('/403', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "pageforbidden"});
  }
});
FlowRouter.route('/404', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "pagenotfound"});
  }
});