// A tiny external store persisted to localStorage, shaped for React's
// useSyncExternalStore:
//   • the server snapshot is always `empty`, so hydration never mismatches;
//   • snapshots are cached, so React sees a stable reference between changes;
//   • other tabs stay in sync through the `storage` event;
//   • if storage is unavailable (private mode, quota) it keeps working in memory.

export interface PersistentStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  update: (updater: (current: T) => T) => void;
}

interface Options<T> {
  key: string;
  empty: T;
  /** Validate/normalise whatever was stored. Must never throw on bad data. */
  parse: (raw: unknown) => T;
}

export function createPersistentStore<T>({ key, empty, parse }: Options<T>): PersistentStore<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  const read = (): T => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? parse(JSON.parse(raw)) : empty;
    } catch {
      return empty;
    }
  };

  const emit = () => listeners.forEach((listener) => listener());

  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      cache = undefined;
      emit();
    }
  };

  const getSnapshot = (): T => {
    if (cache === undefined) cache = read();
    return cache;
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot,
    getServerSnapshot: () => empty,
    update(updater) {
      const next = updater(getSnapshot());
      cache = next;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable — state still lives in memory for this session */
      }
      emit();
    },
  };
}
