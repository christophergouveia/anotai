import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section id="header">
        <h1 className="titulo">anotaí</h1>
        <h2 className="subtitulo">
          Uma maneira mais fácil e inteligente de não esquecer suas anotações.
        </h2>
      </section>

      <section id="anotacoes">
        <span>Suas anotações:</span>
      </section>
    </main>
  );
}
