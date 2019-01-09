import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" render={(props) => <Home {...props} /> }/>
        </Switch>
      </div>
    );
  }
}

export default App;
