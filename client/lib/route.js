FlowRouter.route('/', {
  name:'home',
  action() {
      BlazeLayout.render("landing", {content: "homepage"});}
  }
);

FlowRouter.route('/UserHome', {
  name:'userhome',
  action() {
    Meteor.call('CekPython');
    BlazeLayout.render("landing", {content: "verifyLogin"});
  }
});