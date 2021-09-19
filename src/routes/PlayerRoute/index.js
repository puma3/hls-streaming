import { h } from "preact";
import PlayerWithControls from "../../components/PlayerWithControls";

const Player = ({ player }) => {
  return (
    <div className="container">
      <h2>Player: {player}</h2>
      <PlayerWithControls player={player} />
    </div>
  );
};

export default Player;
