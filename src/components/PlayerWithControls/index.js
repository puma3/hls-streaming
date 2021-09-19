import { Fragment, h } from "preact";
import { ControlsConsumer } from "../../contexts/Controls";
import Controls from "../Controls";
import HlsPlayer from "../HlsPlayer";
import VideoJsPlayer from "../VideoJsPlayer";

const PlayerWithControls = ({ player }) => {
  return (
    <ControlsConsumer>
      {({ options, setOptions }) => (
        <Fragment>
          <Controls options={options} setOptions={setOptions} />
          <div style={{ width: options.width }}>
            {player === "videojs" && <VideoJsPlayer options={options} />}
            {player === "hls" && <HlsPlayer options={options} controls />}
          </div>
        </Fragment>
      )}
    </ControlsConsumer>
  );
};

export default PlayerWithControls;
