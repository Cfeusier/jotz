var React = require('react');
var BlockMenu = require('./block_menu');
var AceEditor = require('./ace_editor');

/*
  Each NoteBlock contains an instance of AceEditor.
  Bring themes and languages in via require in aceConfig.js.
  Callbacks for changing langauges and themes defined here
  BlockMenu is where the changeable menu items are located
  TODO: add themes, make text blocks render different themes than code blocks
  TODO: add block deletion (here, AceEditor, and probably a callback in jotz.js)
 */

var NoteBlock = React.createClass({
  getInitialState: function() {
    return {
      focused: false
    }
  },

  updateNote: function() {
    this.props.updateBlock(this.blockData());
  },

  changeLanguage: function(event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
    this.props.updateBlock(this.blockData(event.target.value));
  },

  makeGist: function() {
    this.props.makeGist(this.props.blockIndex);
  },

  blockData: function(language) {
    return {
      index: this.props.blockIndex,
      content: this.getText(),
      language: language || this.props.language
    };
  },

  getText: function() {
    return this.editor.getText();
  },

  focusBlock: function() {
    this.setState({
      focused: true
    });
  },

  blurBlock: function() {
    this.setState({
      focused: false
    });
  },

  //This creates and appends an ace editor to the appropriate div
  //blockIndex is the associated index in the blocks array
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockIndex);
    this.editor.setText(this.props.text);
    this.editor.changeLanguage('ace/mode/' + this.props.language);
    this.editor.onChange(this.updateNote);
  },

  render: function() {
    var containerClass = 'editor-block-container';
    if (this.state.focused) {
      containerClass += ' focused';
    }
    return (
      <div className={containerClass} onBlur={this.blurBlock} onFocus={this.focusBlock}>
        <div className="editor-block-actions">
          <BlockMenu language={this.props.language} changeLanguage={this.changeLanguage} />
          <button className="btn alt" onClick={this.makeGist}>Create Gist</button>
        </div>
        <div id={'ace-editor' + this.props.blockIndex} className='ace-editor-inner'></div>
      </div>
    );
  }
});

module.exports = NoteBlock;
