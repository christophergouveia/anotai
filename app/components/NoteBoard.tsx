"use client";

import { useCallback } from "react";
import { Note, type NoteColor } from "./Note";
import { useNotesContext } from "../context/NotesContext";

const COLORS: NoteColor[] = ["yellow", "pink", "blue", "mint"];

export function NoteBoard() {
  const { notes, updateNote, deleteNote, addNote, hydrated } = useNotesContext();

  const handleAddNote = useCallback(() => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    addNote(color);
  }, [addNote]);

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
        onClick={handleAddNote}
        aria-label="Adicionar anotação"
      >
        <span className="add__icon">+</span>
        <span>nova anotação</span>
      </button>
    </div>
  );
}
