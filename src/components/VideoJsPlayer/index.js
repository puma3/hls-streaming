import { h } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const defaultOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  preload: true,
  fluid: true,
};

const convertOptions = ({ options: width, ...options }) => {
  const convertedOpts = { ...defaultOptions, ...options };
  convertedOpts.sources = [
    {
      src: options.source,
      type: "application/x-mpegURL",
    },
  ];

  return convertedOpts;
};

const VideoJsPlayer = ({ options: propOptions, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const options = useMemo(() => {
    return convertOptions(propOptions);
  }, [propOptions]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
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
