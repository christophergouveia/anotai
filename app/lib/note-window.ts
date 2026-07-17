"use client";

import { isTauri } from "@tauri-apps/api/core";

export async function openNoteWindow(noteId: string): Promise<void> {
  const label = `note-${noteId}`;
  const url = `/notes?id=${encodeURIComponent(noteId)}`;

  if (isTauri()) {
    const { WebviewWindow } = await import("@tauri-apps/api/webviewWindow");

    const existing = await WebviewWindow.getByLabel(label);
    if (existing) {
      await existing.show();
      await existing.setFocus();
      return;
    }

    const win = new WebviewWindow(label, {
      url,
      title: "Anotação",
      width: 320,
      height: 360,
      minWidth: 240,
      minHeight: 200,
      resizable: true,
      alwaysOnTop: true,
      decorations: false,
      transparent: true,
      shadow: false,
      skipTaskbar: true,
      focus: true,
      center: false,
    });

    win.once("tauri://error", (e) => {
      console.error("Falha ao abrir janela da nota:", e);
    });
    return;
  }

  window.open(url, `_blank-${label}`, "width=320,height=360,popup");
}
