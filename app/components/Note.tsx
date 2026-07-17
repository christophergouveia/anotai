"use client";

import { useRef, useEffect } from "react";
import { VscLinkExternal } from "react-icons/vsc";
import { openNoteWindow } from "../lib/note-window";

export type NoteColor = "yellow" | "pink" | "blue" | "mint";

export interface NoteData {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
}

interface NoteProps {
  data: NoteData;
  onChange: (patch: Partial<NoteData>) => void;
  onDelete: () => void;
}

export function Note({ data, onChange, onDelete }: NoteProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== data.title) {
      titleRef.current.innerText = data.title;
    }
  }, [data.title]);

  useEffect(() => {
    if (bodyRef.current && bodyRef.current.innerText !== data.body) {
      bodyRef.current.innerText = data.body;
    }
  }, [data.body]);

  const handleOpen = () => {
    void openNoteWindow(data.id);
  };

  return (
    <article
      className={`note note--${data.color}`}
      aria-label="Anotação"
    >
      <button
        type="button"
        className="note__delete"
        onClick={onDelete}
        aria-label="Apagar anotação"
        title="Apagar"
      >
        ×
      </button>

      <div
        ref={titleRef}
        className="note__title"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Título"
        onBlur={(e) => onChange({ title: e.currentTarget.innerText })}
      />

      <div
        ref={bodyRef}
        className="note__body"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Escreva algo..."
        onBlur={(e) => onChange({ body: e.currentTarget.innerText })}
      />

      <button
        type="button"
        className="note__open"
        aria-label="Abrir em uma janela flutuante"
        title="Abrir em uma janela flutuante"
        onClick={handleOpen}
      >
        <VscLinkExternal />
      </button>
    </article>
  );
}
