import { createContext, useContext } from "react";

export const Auth = createContext(null);
export const UpdateAuth = () => useContext(Auth);