"use client";

import { useCallback } from "react";
import { Note, type NoteData, type NoteColor } from "./Note";
import useNotes from "../hooks/useNotes";

const COLORS: NoteColor[] = ["yellow", "pink", "blue", "mint"];

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function NoteBoard() {
  const [notes, setNotes, hydrated] = useNotes();

  const updateNote = useCallback(
    (id: string, patch: Partial<NoteData>) => {
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes]
  );

  const addNote = useCallback(() => {
    const id = newId();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setNotes((prev) => [{ id, title: "", body: "", color }, ...prev]);
  }, [setNotes]);

  return (
    <div className="notes">
      {hydrated && notes.length === 0 && (
        <p className="notes__empty">
          Nenhuma anotação por aqui. Que tal colar a primeira?
        </p>
      )}

      {hydrated &&
        notes.map((n) => (
          <Note
            key={n.id}
            data={n}
            onChange={(patch) => updateNote(n.id, patch)}
            onDelete={() => deleteNote(n.id)}
          />
        ))}

      <button
        type="button"
        className="add"
        onClick={addNote}
        aria-label="Adicionar anotação"
      >
        <span className="add__icon">+</span>
        <span>nova anotação</span>
      </button>
    </div>
  );
}
