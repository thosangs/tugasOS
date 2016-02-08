
Template.editor.events({
  "click #button" : function(e, t){
    console.log("clicking");
    var codeType = $('.tab').find('.active').attr('href') == '#editorPython' ? 'py':'R';
    var code = "";
    if ($('.tab').find('.active').attr('href') == '#editorPython') {
      code = t.editorPy.getValue();
    }
    else{
      code = t.editorR.getValue();
    }
    
    var path = PATH + "/public/code/"+ userId + "." + codeType;
    
    console.log(path);
    Meteor.call("writefiletoPath",path,code);

    console.log("command", code);
    Meteor.call('InsertCommand', code);
  }
});

Template.editor.onCreated(function() {
  var self = this;
  self.subscribe("output");
});

Template.editor.onRendered( function() {
  editorPy = CodeMirror.fromTextArea( this.find( "#editorPy" ), {
    lineNumbers: true,
    fixedGutter: false,
    mode: "python",
    lineWrapping: true,
    theme: "monokai",
    cursorHeight: 0.85});
  editorR = CodeMirror.fromTextArea( this.find( "#editorR" ), {
    lineNumbers: true,
    fixedGutter: false,
    mode: "R",
    lineWrapping: true,
    theme: "monokai",
    cursorHeight: 0.85});
  editing = CodeMirror.fromTextArea( this.find( "#terminaleditor" ), {
    lineNumbers: false,
    fixedGutter: false,
    mode: "perl",
    lineWrapping: true,
    theme: "monokai",
    cursorHeight: 0.85,
    readOnly: true});

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
      return (curr_hour + ":" + curr_min + " " + a_p);};

  var query = Replies.find({});

  query.observeChanges({
    added: function (id,post) {
      d = getHour(new Date(post.date));
      editing.replaceRange(
        d+"$: "+post.command+'\n'+
        post.message+'\n', 
        {line: Infinity});
    }});
  
  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  editing.setCursor(editing.lineCount(), 0);

  this.editorPy = editorPy;
  this.editorR = editorR;
  this.editing = editing;
});