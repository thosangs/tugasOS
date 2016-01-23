  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

Meteor.autorun(function () {
    var stat;
    if (Meteor.status().status === "connected") {
        stat = 'lime'}
    else if (Meteor.status().status === "connecting") {
        stat = 'yellow'}
    else {
        stat = 'red';}
    Session.setPersistent('status',stat);
});