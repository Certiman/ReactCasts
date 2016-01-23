var React = require('react');
// var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  render: function() {
    return <div>
      <div className="input-group">
        <div className="input-group-addon">
          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
        </div>
        <input
          value={this.state.text}
          onChange={this.handleInputChange}
          onKeyUp={this.handleEnterKey}
          type="text" placeholder="To do item..."
          className="form-control" />
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-default"
            type="button">
            Add
          </button>
        </span>
      </div>
    </div>
  },
  handleClick: function() {
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });

    this.setState({text: ''});
  },
  handleEnterKey: function(event){
    if(event.keyCode == 13){
      this.handleClick();
    }
  },
  handleInputChange: function(event) {
    this.setState({text: event.target.value});
  }
});
