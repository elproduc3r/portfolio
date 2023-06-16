import { createContext } from "react";

interface EnvContextType {
  env: string;
};

const EnvContext = createContext<EnvContextType>({
  env: process.env.NODE_ENV || "development"
});

export default EnvContext;
