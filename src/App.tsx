import * as React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Pages from "./pages/Pages";
import "./scss/index.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Pages />
      </Router>
    </div>
  );
}

export default App;
