import { h, createContext } from "preact";
import { useState } from "preact/hooks";
import { DEFAULT_OPTIONS } from "../../components/Controls";

const Controls = createContext("controls");

export const ControlsProvider = ({ children }) => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  return (
    <Controls.Provider value={{ options, setOptions }}>
      {children}
    </Controls.Provider>
  );
};

export const ControlsConsumer = Controls.Consumer;
