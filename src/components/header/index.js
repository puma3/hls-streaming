import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/player/video">Video.js</Link>
			<Link activeClassName={style.active} href="/player/hls">HLS.js</Link>
		</nav>
	</header>
);

export default Header;
