var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://blistering-fire-2622.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false,
      completeditems: true
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                To-Do List
              </a>
              <Header itemsStore={this.firebaseRefs.items} />
              <div className="navbar-right">{this.deleteButton()}</div>
            </div>
          </div>
        </nav>
      </div>
      <div >
        <div className="col-md-8 col-md-offset-2">
          <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
            <List items={this.state.items} />
          </div>
        </div>
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return  // The Firebase object is not loaded
    } else if(!this.state.completeditems) {
      return // There are no objects with state complete
    } else {
      return <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default navbar-btn">
          Clear Completed
        </button>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function(){
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
