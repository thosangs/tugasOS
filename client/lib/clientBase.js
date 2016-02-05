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

Template.terminal.helpers({
  Replies: function () {
      return Replies.find({});
  }
});

Template.editor.events({
  "click #button" : function(e, t){
    console.log("clicking");
    var code = t.editor.getValue();
    var path = PATH + "/public/cekMimin/file.txt";
    
    console.log(path);
    //path = "/home/mukhlis/tugasos/public/coucou.txt";
    //console.log(path);
    Meteor.call("writefiletoPath",path,code);

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
        return Replies.find({});
    },

    "optionsOutput": function() {
        return {
            lineNumbers: false,
            mode: "python",
            theme: "paraiso-light",
            lineWrapping: true,
            readOnly: true
       }
    }

});

Template.editor.onRendered( function() {
  editor = CodeMirror.fromTextArea( this.find( "#editor" ), {
    lineNumbers: true,
    fixedGutter: false,
    mode: "markdown",
    lineWrapping: true,
    cursorHeight: 0.85
  });

  editing = CodeMirror.fromTextArea( this.find( "#terminaleditor" ), {
    lineNumbers: false,
    fixedGutter: false,
    mode: "bash",
    lineWrapping: true,
    theme: "monokai",
    cursorHeight: 0.85,
    readOnly: true
  });

  function getHour(d){
      var curr_hour = d.getHours();
      if (curr_hour < 12)
         {
         a_p = "AM";
         }
      else
         {
         a_p = "PM";
         }
      if (curr_hour == 0)
         {
         curr_hour = 12;
         }
      if (curr_hour > 12)
         {
         curr_hour = curr_hour - 12;
         }

      var curr_min = d.getMinutes();
      return (curr_hour + ":" + curr_min + " " + a_p);
  };

  var query = Replies.find({});
  query.observeChanges({
    added: function (id,post) {
      d = getHour(new Date(post.date));
      editing.replaceRange(
        d+"$: "+post.command+'\n'+
        post.message+'\n', 
        {line: Infinity});
    }
  });

  this.editor = editor;
  this.editing = editing;
});