import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Entry from './components/Entry';
import AddEntry from './components/AddEntry';
import { listLogEntries } from './api';
import Home from './components/Home';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/users">
            <h2>Hello users</h2>
          </Route>
          <Route path="/add">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <AddEntry />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/:id" children={<Entry />} />
          <Route path="/">
            <Home logEntries={logEntries} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
