  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

Template.terminal.events({
  'click #button': function () {
    console.log("clicking");
    var cmd = $("input#command").val();
    console.log("command", cmd);
    Meteor.call('command', cmd);
  }
});

Template.terminal.onCreated(function() {
  var self = this;
  self.subscribe("output");
});

Template.terminal.helpers({
  Replies: function () {
      return Replies.find({});
  }
});