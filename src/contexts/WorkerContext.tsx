/**
 * Worker context — provides auth state for the worker dashboard.
 * Refactored to use the custom backend instead of direct Supabase auth.
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Worker } from "@/lib/supabase";
import { getMyWorkerProfile } from "@/lib/workerApi";
import { useAuth } from "@/contexts/AuthContext";

type WorkerContextValue = {
  worker: Worker | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const WorkerContext = createContext<WorkerContextValue | null>(null);

export function WorkerProvider({ children }: { children: React.ReactNode }) {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthed } = useAuth();

  const refresh = async () => {
    if (!isAuthed) {
      setWorker(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await getMyWorkerProfile();
      if (fetchErr) {
        setError((fetchErr as Error).message || "Failed to load worker profile");
      } else {
        setWorker(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  const value = useMemo(
    () => ({ worker, isLoading, error, refresh }),
    [worker, isLoading, error]
  );

  return <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>;
}

export function useWorker() {
  const ctx = useContext(WorkerContext);
  if (!ctx) throw new Error("useWorker must be used inside WorkerProvider");
  return ctx;
}
