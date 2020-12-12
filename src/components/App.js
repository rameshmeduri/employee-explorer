import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmpSearch from './EmpSearch';
import EmpOverview from './EmpOverview';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={EmpSearch} exact />
          <Route path="/overview/:empName" exact children={<EmpOverview />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
