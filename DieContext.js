import { createContext, useContext } from "react";

const DieContext = createContext('');

export function useDieContext() {
  return useContext(DieContext);
}

export default DieContext;
