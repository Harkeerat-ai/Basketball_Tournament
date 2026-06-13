"use client";

import { useState, useEffect, useRef } from "react";
import type { Unsubscribe } from "firebase/database";

type SubscribeFn<T> = (cb: (data: T | null) => void) => Unsubscribe;

interface FirebaseDataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useFirebaseData<T>(
  subscribeFn: SubscribeFn<T>,
  fallback: T,
  cacheKey?: string
): FirebaseDataState<T> {
  const [state, setState] = useState<FirebaseDataState<T>>(() => {
    let initialData = fallback;
    if (cacheKey && typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          initialData = JSON.parse(cached);
        }
      } catch (e) {
        console.error("Failed to load cached data", e);
      }
    }
    return {
      data: initialData,
      loading: true,
      error: null,
    };
  });
  const unsub = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    try {
      unsub.current = subscribeFn((data) => {
        const resolvedData = data ?? fallback;
        if (cacheKey && typeof window !== "undefined") {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(resolvedData));
          } catch (e) {
            console.error("Failed to cache data", e);
          }
        }
        setState({ data: resolvedData, loading: false, error: null });
      });
    } catch (e) {
      setState((prev) => ({ ...prev, loading: false, error: (e as Error).message }));
    }
    return () => unsub.current?.();
  }, [subscribeFn, cacheKey, fallback]);

  return state;
}

