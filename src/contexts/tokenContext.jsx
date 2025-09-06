import { createContext, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
