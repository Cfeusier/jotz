var fs = require('fs');
var ipc = require('ipc');
var utils = require('../utils/global');

// TODO: Add CRUD interface for FsSync

var NotesAPI = (function() {

  // Private API
  var api = {
    findNote: function(filename, cb) {
      utils.getNotesDirData(function(noteFilenames) {
        noteFilenames.indexOf(filename) >= 0 ? cb(true) : cb(false);
      });
    },
    noteFilename: function(noteId, noteTitle) {
      return noteId + '_' + api.titleToFile(noteTitle) + '.json';
    },
    titleToFile: function(noteTitle) {
      return noteTitle.toString().toLowerCase().replace(/\s+/gi, '_');
    },
    writeNote: function(filename, noteData, cb) {
      var filePath = utils.getNotesDirPath() + filename;
      fs.writeFile(filePath, JSON.stringify(noteData), { encoding: 'utf8' }, cb);
    }
  };

  // Public API
  return {
    saveNote: function(note, cb) {
      var filename = api.noteFilename(note.attributes._id, note.attributes.title);
      api.findNote(filename, function() {
          api.writeNote(filename, note.attributes, cb);
      });
    }
  };

})();

module.exports = NotesAPI;

