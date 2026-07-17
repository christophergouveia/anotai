import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import type { NoteData } from "../components/Note";

export default function useNotes() {
  const [notes, setNotes] = useLocalStorage<NoteData[]>("notes", []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return [notes, setNotes, hydrated] as const;
}
