import { h } from "preact";
import { Router } from "preact-router";

import Header from "./Header";

import Home from "../routes/Home";
import Player from "../routes/PlayerRoute";
import { ControlsProvider } from "../contexts/Controls";

const App = () => (
  <div id="app">
    <Header />
    <ControlsProvider>
      <Router>
        <Home path="/" />
        {/* <Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" /> */}
        <Player path="/player/:player" />
      </Router>
    </ControlsProvider>
  </div>
);

export default App;
