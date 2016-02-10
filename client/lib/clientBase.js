
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
    
    var path = PATH + "/user/"+ Meteor.userId()+"." + codeType;

    Meteor.call("writefiletoPath",path,code);
    Meteor.call("Run",path,codeType);
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
    mode: "r",
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

  //filePath = "/user/"+this.userId;
  //if (fileexist(filePath+".py"))
  //  editorPy.setValue(file);
  //if (fileexist(filePath+".R"))
  //  editorR.setValue(file("/user/"+this.userId+".R"));

  function getHour(d){
      var curr_hour = d.getHours();
      a_p = curr_hour<12 ? "AM":"PM" ;

      if (curr_hour == 0){curr_hour = 12;}
      if (curr_hour > 12){curr_hour = curr_hour - 12;}

      var curr_min = d.getMinutes();
      return (curr_hour + ":" + curr_min + " " + a_p);
  };

  Replies.find({}).observeChanges({
    added: function (id,post) {
      d = getHour(new Date(post.date));
      editing.replaceRange(
        '\n'+d+" "+Meteor.user().username+"$: "+post.command+'\n'+
        post.message, 
        {line: Infinity});
    }
  });
  
  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  this.editorPy = editorPy;
  this.editorR = editorR;
  this.editing = editing;
});