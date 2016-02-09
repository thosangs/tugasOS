FlowRouter.route('/', {
  name:'home',
  action() {
      BlazeLayout.render("landing", {content: "homepage"});}
  }
);

FlowRouter.route('/UserHome', {
  name:'userhome',
  action() {
    BlazeLayout.render("landing", {content: "kopas"});
  }
});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    action: function() {
//namanya pastiin lagi 
		BlazeLayout.render("landing", {content: "404notFound"});
    }
};