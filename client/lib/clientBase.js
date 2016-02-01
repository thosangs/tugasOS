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

Template.editor.events({

  "click #button" : function(e, t){
    console.log("clicking");
    var code = t.find("#some-id").value;
    console.log("command", code);
    Meteor.call('command', code);
    console.log("udah manggil meteor");
  }

});

Template.editor.onCreated(function() {
  var self = this;
  self.subscribe("output");
});

Template.editor.helpers({
    Replies: function () {
        return Replies.find({});
    },

    "editorOptions": function() {
        return {
            lineNumbers: true,
            mode: "javascript"
        }
    },

    "editorCode": function() {
        return "Code to show in editor";
    },

    "getEditorText": function(){
      return Session.get("varName");
    }

});