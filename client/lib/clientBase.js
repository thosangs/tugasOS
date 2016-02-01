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
      var replyId = Meteor.call('command', cmd);
      Session.set('replyId', replyId);
      console.log(replyId);
    }
  });