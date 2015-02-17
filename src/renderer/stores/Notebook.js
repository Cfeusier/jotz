var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');


var Notebook = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    ipc.on('save-note-reply', this.handleSaveNoteReply.bind(this));
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'new-note':
        // TODO: display creation/editing view
        break;
      case 'create-note':
        new Note(payload.content).save();
        break;
      case 'read-notes':
        // TODO
        //this.fetch();
        break;
      case 'update-note':
        //this.update();
        break;
      case 'destroy-note':
        // TODO
        //this.remove();
        break;
      default:
        break;
    }
  },

  handleSaveNoteReply: function(err) {
    if (err) {
      // TODO: ask guys how we want to handle error
      // pull it out of collection and add error message to user?
    } else {
      // display 'note saved!' message to user
    }
  }
});

var NotebookStore = new Notebook();

module.exports = NotebookStore;
