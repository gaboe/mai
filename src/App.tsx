import * as React from "react";
import "./App.css";

import { Layout } from "./components/layout/Layout";
import { HashRouter as Router } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
class App extends React.Component {
  public render() {
    return (
      <>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </>
    );
  }
}

export default App;
