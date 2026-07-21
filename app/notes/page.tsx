"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { VscChromeClose } from "react-icons/vsc";
import { useNotesContext } from "../context/NotesContext";
import type { NoteData } from "../components/Note";

function FloatingNote({
  note,
  onChange,
}: {
  note: NoteData;
  onChange: (patch: Partial<NoteData>) => void;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== note.title) {
      titleRef.current.innerText = note.title;
    }
  }, [note.title]);

  useEffect(() => {
    if (bodyRef.current && bodyRef.current.innerText !== note.body) {
      bodyRef.current.innerText = note.body;
    }
  }, [note.body]);

  return (
    <div className={`floating-note floating-note--${note.color}`}>
      {/* <div
        ref={titleRef}
        className="floating-note__title"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Título"
        onBlur={(e) => onChange({ title: e.currentTarget.innerText })}
      /> */}
      <div
        ref={bodyRef}
        className="floating-note__body"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Escreva algo..."
        onBlur={(e) => onChange({ body: e.currentTarget.innerText })}
      />
    </div>
  );
}

function NotePageInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { notes, updateNote, hydrated } = useNotesContext();

  const handleClose = async () => {
    try {
      const win = getCurrentWindow();
      await win.close();
    } catch {
      window.close();
    }
  };

  const note = id ? notes.find((n) => n.id === id) : undefined;

  if (!hydrated) return null;

  return (
    <div className="note-window">
      <header className="note-window__toolbar" data-tauri-drag-region>
        <button
          type="button"
          className="note-window__close"
          onClick={handleClose}
          aria-label="Fechar janela"
          title="Fechar"
        >
          <VscChromeClose />
        </button>
      </header>

      <div className="note-window__body">
        {note ? (
          <FloatingNote note={note} onChange={(patch) => updateNote(note.id, patch)} />
        ) : (
          <div className="note-window__empty">
            <p>Esta anotação não existe mais.</p>
            <button type="button" onClick={handleClose}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NotePage() {
  return (
    <Suspense fallback={null}>
      <NotePageInner />
    </Suspense>
  );
}
