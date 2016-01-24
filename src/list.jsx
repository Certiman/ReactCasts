var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <div className="list-group">
      {this.renderList()}
    </div>;
  },
  renderList: function() {
    if(!this.props.items) {
      return <h4>
        Add a todo to get started.
      </h4>;
    } else {
      var children = [];
      this.anyCompleted=false; // TODO
      
      for(var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;
        // ERROR: state updates trigger render itself!
        // if (item.done === true) { this.setState({completedItems: true}); }
        if (item.done === true) { this.anyCompleted=true; } //TODO
        
        children.push(
          <ListItem
            item={item}
            key={key}
            >
          </ListItem>
        );
      }

      return children;
    }
  }
});
