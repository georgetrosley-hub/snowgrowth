import { useCallback, useEffect, useState } from "react";

function safeParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const raw = window.localStorage.getItem(key);
    if (!raw) return;
    const parsed = safeParse<T>(raw);
    if (parsed === null) return;
    setValue(parsed);
    // Intentionally only re-hydrate when the storage key changes (not when initialValue changes).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key-only hydration
  }, [key]);

  const setAndPersist = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        window.localStorage.setItem(key, JSON.stringify(resolved));
        return resolved;
      });
    },
    [key]
  );

  return [value, setAndPersist] as const;
}

