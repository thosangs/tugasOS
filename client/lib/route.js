FlowRouter.route('/', {
  name:'home',
  action() {
    if (!Session.get('sudahLogin')) {
      BlazeLayout.render("landing", {content: "homepage"});}
    else{
      FlowRouter.go('vote');}
  }
});

FlowRouter.route('/terminal', {
  name:'terminal',
  action() {
    BlazeLayout.render("landing", {content: "terminal"});
	}
});

FlowRouter.route('/editor', {
  name:'editor',
  action() {
    BlazeLayout.render("landing", {content: "editor"});
  }
});

FlowRouter.route('/python', {
  name:'python',
  action() {
    BlazeLayout.render("landing", {content: "editor"}); 
    Meteor.call('CekPython');
  }
});