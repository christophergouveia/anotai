'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { NoteData } from '@/app/components/Note';
import useLocalStorage from '@/app/hooks/useLocalStorage';

interface NotesContextType {
  notes: NoteData[];
  setNotes: (notes: NoteData[] | ((prev: NoteData[]) => NoteData[])) => void;
  updateNote: (id: string, patch: Partial<NoteData>) => void;
  deleteNote: (id: string) => void;
  addNote: (color: 'yellow' | 'pink' | 'blue' | 'mint') => void;
  hydrated: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

let broadcastChannel: BroadcastChannel | null = null;

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [storedNotes, setStoredNotes] = useLocalStorage<NoteData[]>('notes', []);
  const [notes, setNotesState] = useState<NoteData[]>(storedNotes);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotesState(storedNotes);
    setHydrated(true);

    try {
      broadcastChannel = new BroadcastChannel('notes-channel');
      
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'notes-updated') {
          setNotesState(event.data.notes);
        }
      };

      broadcastChannel.addEventListener('message', handleMessage);

      return () => {
        broadcastChannel?.removeEventListener('message', handleMessage);
        broadcastChannel?.close();
      };
    } catch (error) {
      console.error('BroadcastChannel não disponível:', error);
    }
  }, [storedNotes]);

  const setNotes = useCallback(
    (value: NoteData[] | ((prev: NoteData[]) => NoteData[])) => {
      const newNotes = typeof value === 'function' ? value(notes) : value;
      
      setStoredNotes(newNotes);
      setNotesState(newNotes);

      try {
        broadcastChannel?.postMessage({
          type: 'notes-updated',
          notes: newNotes,
        });
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    },
    [notes, setStoredNotes]
  );

  const updateNote = useCallback(
    (id: string, patch: Partial<NoteData>) => {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...patch } : n))
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes]
  );

  const addNote = useCallback(
    (color: 'yellow' | 'pink' | 'blue' | 'mint') => {
      const id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      setNotes((prev) => [{ id, title: '', body: '', color }, ...prev]);
    },
    [setNotes]
  );

  return (
    <NotesContext.Provider value={{ notes, setNotes, updateNote, deleteNote, addNote, hydrated }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext deve ser usado dentro de NotesProvider');
  }
  return context;
}
