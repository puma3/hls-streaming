import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const videoJsOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  preload: true,
  fluid: true,
  sources: [
    {
      src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

const VideoJsPlayer = ({ options = videoJsOptions, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, onReady]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoJsPlayer;
