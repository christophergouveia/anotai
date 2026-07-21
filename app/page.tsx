import { NoteBoard } from "./components/NoteBoard";
import { AutostartButton } from "./components/AutostartButton";

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1 className="header__title">anotaí</h1>
        <p className="header__sub">
          Uma maneira mais fácil e inteligente de não esquecer suas anotações.
        </p>
      </header>

      <NoteBoard />

      <div className="autostart-container">
        <AutostartButton />
      </div>
    </main>
  );
}
