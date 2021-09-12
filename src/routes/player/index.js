import { h } from 'preact';
import Body from '../../components/body';

const Player = ({ player }) => {
	return (
		<Body>
			<h1>Player: {player}</h1>
		</Body>
	);
}

export default Player;
