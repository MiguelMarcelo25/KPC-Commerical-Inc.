"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Global emergency dialog state — any "Request Service" button anywhere
 * in the tree triggers `open()`. Cleaner than prop-drilling and lighter
 * than introducing zustand/jotai for one piece of state.
 */
interface EmergencyDialogContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EmergencyDialogContext = createContext<EmergencyDialogContextValue | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <EmergencyDialogContext.Provider value={value}>{children}</EmergencyDialogContext.Provider>;
}

export function useEmergencyDialog(): EmergencyDialogContextValue {
  const ctx = useContext(EmergencyDialogContext);
  if (!ctx) throw new Error("useEmergencyDialog must be used within <Providers>");
  return ctx;
}
