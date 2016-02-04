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
    Meteor.call('InsertCommand', cmd);
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
    var code = t.editor.getValue();
    console.log("command", code);
    Meteor.call('InsertCommand', code);
    //var editing = CodeMirror.fromTextArea(t.find("#terminaleditor"));
    t.editing.replaceRange("foo\n", {line: Infinity});
  }
});

Template.editor.onCreated(function() {
  var self = this;
  self.subscribe("output");
});

Template.editor.helpers({
    Replies: function () {
        return Replies.find({},{sort: {date: -1}});
    },

    "optionsTerminal": function() {
        return {
            lineNumbers: false,
            mode: "python",
            lineWrapping: true
        }
    },

    "optionsCodeEditor": function() {
        return {
            lineNumbers: true,
            mode: "python",
            theme: "paraiso-light",
            lineWrapping: true
        }
    },

    "optionsOutput": function() {
        return {
            lineNumbers: false,
            mode: "python",
            theme: "paraiso-light",
            lineWrapping: true,
            readOnly: true
       }
    },


    "editorCode": function() {
        return "Code to show in editor";
    },

    "getEditorText": function(){
      return Session.get("code");
    }

});

Template.editor.onRendered( function() {
  this.editor = CodeMirror.fromTextArea( this.find( "#editor" ), {
    lineNumbers: true,
    fixedGutter: false,
    mode: "markdown",
    lineWrapping: true,
    cursorHeight: 0.85
  });
  this.editing = CodeMirror.fromTextArea( this.find( "#terminaleditor" ), {
    lineNumbers: false,
    fixedGutter: false,
    mode: "markdown",
    lineWrapping: true,
    theme: "paraiso-light",
    cursorHeight: 0.85,
    readOnly: true
  });
});