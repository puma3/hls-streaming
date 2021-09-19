import { h } from "preact";
import { Link } from "preact-router/match";

const Header = () => (
  <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <a className="navbar-brand">HLS Stream</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link className="nav-link" activeClassName="active" href="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link
              className="nav-link"
              activeClassName="active"
              href="/player/videojs"
            >
              Video.js
            </Link>
          </li>
          <li class="nav-item dropdown">
            <Link
              className="nav-link"
              activeClassName="active"
              href="/player/hls"
            >
              HLS.js
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
