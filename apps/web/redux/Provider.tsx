'use client'
import { Provider } from "react-redux";
import { reduxStore } from "./store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
