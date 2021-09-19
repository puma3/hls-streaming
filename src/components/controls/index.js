import { h } from "preact";

const Controls = () => {
  return (
    <div className="mb-4">
      <div className="row">
        <div className="column">Column</div>
        <div className="column">Column</div>
      </div>
      <span className="text-primary">Some Text</span>
      <button type="button" className="btn btn-primary">
        Something
      </button>
    </div>
  );
};

export default Controls;
