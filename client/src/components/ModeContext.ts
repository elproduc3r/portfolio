import {createContext} from "react";

export type ModeType = {
  mode: "dark" | "light";
};

const ModeContext = createContext<ModeType>({
  mode: "dark",
});

export default ModeContext;