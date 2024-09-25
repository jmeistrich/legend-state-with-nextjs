"use client";
import { Observable, observable } from "@legendapp/state";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  counter$: observable(0),
});

export const useCounter = (): { counter$: Observable<number> } => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useCounter must be used within a StateContextProvider");
  }
  return context;
};

export default function StateContextProvider(
  { children }: { children: React.ReactNode },
) {
  const [counter$] = useState(() => observable(0));

  return (
    <StateContext.Provider value={{ counter$ }}>
      {children}
    </StateContext.Provider>
  );
}
