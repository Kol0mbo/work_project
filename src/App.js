import React from 'react';  
import Tabs from './Tabs';
import Info from './Info';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Tabs} />
          <Route path="/info/:id" component={Info} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
