/* Module Dependencies */
var Backbone = require('backbone');
var ipc = require('ipc');
var NotesAPI = require('../apis/notes_api');

/* FsSync Module */
var FsSync = (function(Backbone) {

  /* Private API */

  // Generate four random hex digits
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  // Generate a pseudo-GUID by concatenating random hexadecimal
  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  function isObject(item) {
    return item === Object(item);
  };

  function contains(array, item) {
    var i = array.length;
    while (i--) if (array[i] === item) return true;
    return false;
  };

  function result(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return (typeof value === 'function') ? object[property]() : value;
  };

  var store = {
    notesDir: '',

    create: function(note) {
      // TODO: handle first time note creation (#save)
      NotesAPI.saveNote(note, function(result) {
        //e.sender.send('save-note-reply', result);
        console.log(result);
      });
    },

    read: function() {
      // TODO: handle collection read (#fetch)
      //ipc.send('read-notes');
    },

    update: function() {
      // TODO: handle note update (#update)
      //ipc.send('update-note', note);
    },

    destroy: function() {
      // TODO: handle note destruction (#remove)
      //ipc.send('destroy-note');
    }
  };

  /* Public API */

  return {

    sync: function(method, model, options) {
      store.notesDir = result(model, 'fsStorage') || result(model.collection, 'fsStorage');

      var resp, errorMessage;
      var deferred = (Backbone.Deferred && Backbone.Deferred());

      switch(method) {
        case 'read':
          //resp = model.id != undefined ? store.find(model) : store.findAll();
          break;
        case 'create':
          resp = store.create(model.attributes);
          break;
        case 'update':
          //resp = store.update(model);
          break;
        case 'delete':
          //resp = store.destroy(model);
          break;
      }
      //
      //if (resp) {
      //  if (options && options.success) {
      //    Backbone.VERSION === "0.9.10" ? options.success(model, resp, options) : options.success(resp);
      //  }
      //  if (deferred) deferred.resolve(resp);
      //} else {
      //  errorMessage = errorMessage ? errorMessage  : "Record Not Found";
      //  if (options && options.error) {
      //    Backbone.VERSION === "0.9.10" ? options.error(model, errorMessage, options) : options.error(errorMessage);
      //  }
      //}
      //
      //if (options && options.complete) options.complete(resp);
      //return deferred && deferred.promise();
    }
  };

})(Backbone);

module.exports = FsSync;
