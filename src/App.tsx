import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { loadMapApi } from "./mapUtils/googleMapUtils";
import { useDispatch, useSelector } from "react-redux"
import { setMapLoaded } from "./store/actions/loggedActions"

import Pages from "./pages/Pages";
import "./scss/index.scss";





function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const googleMapScript = loadMapApi();

    googleMapScript.addEventListener('load', () => {
      dispatch(setMapLoaded(true))
    })


  }, [])

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
