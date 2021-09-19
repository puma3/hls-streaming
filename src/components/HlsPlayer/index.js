import { h } from "preact";
import Hls from "hls.js";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const HlsPlayer = ({
  options: { source: src, autoplay: autoPlay },
  ...props
}) => {
  const hslIsSupported = Hls.isSupported();
  const [hls, setHls] = useState(null);
  const videoRef = useRef(null);

  const destroyPlayer = hls ? hls.destroy : () => {};

  const initPlayer = useCallback(() => {
    if (!videoRef.current) return;

    const newHls = new Hls({
      enableWorker: false,
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
  }, [src, videoRef]);

  useEffect(() => {
    if (hslIsSupported) initPlayer();
    return destroyPlayer;
  }, [src]);

  return hslIsSupported ? (
    <video ref={videoRef} style={{ width: "100%" }} {...props} />
  ) : (
    <video ref={videoRef} src={src} autoPlay={autoPlay} {...props} />
  );
};

export default HlsPlayer;
