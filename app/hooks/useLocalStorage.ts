import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T, Dispatch<SetStateAction<T>>] {
  const fullKey = `anoteai-${key}`;
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(fullKey);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`useLocalStorage: falha ao ler "${fullKey}"`, error);
    }
  }, [fullKey]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof value === "function" ? (value as (prev: T) => T)(prev) : value;

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(fullKey, JSON.stringify(nextValue));
          } catch (error) {
            console.error(
              `useLocalStorage: falha ao gravar "${fullKey}"`,
              error,
            );
          }
        }
        return nextValue;
      });
    },
    [fullKey],
  );

  return [storedValue, setValue] as const;
}
