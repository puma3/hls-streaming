import { h } from "preact";
import { Router } from "preact-router";

import Header from "./Header";

import Home from "../routes/Home";
import Player from "../routes/PlayerRoute";

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      {/* <Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" /> */}
      <Player path="/player/:player" />
    </Router>
  </div>
);

export default App;
