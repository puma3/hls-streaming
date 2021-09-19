import { h } from "preact";
import Hls from "hls.js";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const HlsPlayer = ({ hlsConfig = {}, src, autoPlay, ...props }) => {
  const hslIsSupported = Hls.isSupported();
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);

  const initPlayer = useCallback(() => {
    if (!videoRef.current) return;

    const newHls = new Hls({
      enableWorker: false,
      ...hlsConfig,
    });

    newHls.attachMedia(videoRef.current);
    newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
      newHls.loadSource(src);
      newHls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          videoRef?.current
            ?.play()
            .catch(() =>
              console.log(
                "Unable to autoplay prior to user interaction with the dom."
              )
            );
        }
      });
    });

    newHls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            newHls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            newHls.recoverMediaError();
            break;
          default:
            initPlayer();
            break;
        }
      }
    });

    setHls(newHls);
  }, [hlsConfig, autoPlay, src, videoRef]);

  const destroyPlayer = () => hls && hls.destroy;

  useEffect(() => {
    if (hslIsSupported) initPlayer();
    return destroyPlayer();
  }, []);

  return hslIsSupported ? (
    <video ref={videoRef} {...props} />
  ) : (
    <video ref={videoRef} src={src} autoPlay={autoPlay} {...props} />
  );
};

export default HlsPlayer;
