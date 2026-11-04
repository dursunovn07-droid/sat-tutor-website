"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";

type AppState = { ready: boolean; setReady: (v: boolean) => void };
const AppContext = createContext<AppState>({ ready: true, setReady: () => {} });

/** `ready` flips to true once the intro preloader has finished. */
export const useAppReady = () => useContext(AppContext);

/** Global providers — motion config automatically honours `prefers-reduced-motion`. */
export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <AppContext.Provider value={{ ready, setReady }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  );
}
