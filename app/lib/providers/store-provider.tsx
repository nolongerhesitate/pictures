"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";
import { ReactNode } from "react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore>>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
