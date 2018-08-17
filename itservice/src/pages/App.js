import React, { Component } from 'react';
import Header from '../components/Header/Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-flud">
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;