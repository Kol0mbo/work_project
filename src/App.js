import React from 'react';  
import Tabs from './Tabs';
import Info from './Info';
import Fav from './Fav';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Tabs} />
          <Route path="/info/:id" component={Info} />
          <Route path="/fav" component={Fav} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
