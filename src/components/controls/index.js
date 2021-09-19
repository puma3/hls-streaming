import { h } from "preact";

const sourceList = [
  "https://d2ufudlfb4rsg4.cloudfront.net/cnettv/hcgBWevF/adaptive/hcgBWevF_master.m3u8",
  "http://d2ufudlfb4rsg4.cloudfront.net/fox9minneapolis/RDWN15EC/adaptive/RDWN15EC_master.m3u8",
  "https://d2ufudlfb4rsg4.cloudfront.net/i24news/btiiAgOKj/adaptive/btiiAgOKj_master.m3u8",
  "https://d2ufudlfb4rsg4.cloudfront.net/bloomberg/Thy6p8Ftc/adaptive/Thy6p8Ftc_master.m3u8",
];

const widthList = ["100%", "80%", "240px", "426px", "640px", "720px", "854px"];

export const DEFAULT_OPTIONS = {
  autoplay: true,
  responsive: true,
  preload: true,
  fluid: true,
  width: widthList[0],
  source: sourceList[0],
};

const Controls = ({ options = DEFAULT_OPTIONS, setOptions }) => {
  return (
    <div className="mb-4">
      <div className="column">
        <div className="row mb-2">
          <div>Source</div>
          <div>
            <select
              className="form-select"
              aria-label="Source select"
              onChange={(e) => {
                setOptions({ ...options, source: e.target.value });
              }}
            >
              {sourceList.map((opt, idx) => (
                <option value={opt} key={idx}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div>HTML video element width</div>
          <div>
            <select
              className="form-select"
              aria-label="Video width select"
              onChange={(e) => {
                setOptions({ ...options, width: e.target.value });
              }}
            >
              {widthList.map((opt, idx) => (
                <option value={opt} key={idx}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
