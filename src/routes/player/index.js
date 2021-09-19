import { h } from "preact";
import Body from "../../components/body";
import PlayerWithControls from "../../components/PlayerWithControls";

const Player = ({ player }) => {
  return (
    <Body>
      <h1>Player: {player}</h1>
      <PlayerWithControls player={player} />
    </Body>
  );
};

export default Player;
