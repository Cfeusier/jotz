var Backbone = require('backbone');
var remote = require('remote');
var path = require('path');
var utils = remote.require(path.join(__dirname, '../../browser/utils/global.js'));
var syncFs = remote.require(path.resolve(__dirname, '../../browser/utils/syncFs'));

var Note = Backbone.Model.extend({

  'sync': syncFs.sync,

  'fsStorage': utils.getNotesDirPath()

});

module.exports = Note;