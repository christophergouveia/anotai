"use client";

import { useEffect, useState, useCallback } from "react";
import { Note, type NoteData, type NoteColor } from "./Note";

const STORAGE_KEY = "anotai:notes";
const COLORS: NoteColor[] = ["yellow", "pink", "blue", "mint"];

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function loadNotes(): NoteData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedNotes();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as NoteData[];
  } catch {
    return [];
  }
}

function seedNotes(): NoteData[] {
  return [
    {
      id: newId(),
      title: "Bem-vindo!",
      body: "Clique em qualquer lugar para editar. Passe o mouse pra ver o botão de apagar. Use o cartão pontilhado pra criar mais.",
      color: "yellow"
    }
  ];
}

export function NoteBoard() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
    }
  }, [notes, hydrated]);

  const updateNote = useCallback((id: string, patch: Partial<NoteData>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNote = useCallback(() => {
    const id = newId();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setNotes((prev) => [
      { id, title: "", body: "", color},
      ...prev,
    ]);
  }, []);

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
