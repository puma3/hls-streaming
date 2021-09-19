import { Fragment, h } from "preact";
import Controls from "../controls";
import HlsPlayer from "../HlsPlayer";
import VideoJsPlayer from "../VideoJsPlayer";

const PlayerWithControls = ({ player }) => (
  <Fragment>
    <Controls />
    {player === "videojs" && <VideoJsPlayer />}
    {player === "hls" && (
      <HlsPlayer
        src="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
        autoPlay
        controls
      />
    )}
  </Fragment>
);

export default PlayerWithControls;
