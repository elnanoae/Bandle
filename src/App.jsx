import "./index.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>
          B<span>🎸</span>NDLE
        </h1>

        <p>Adivina la banda</p>
      </header>

      <main className="game-container">
        <section className="intro">
          <h2>🎵 ¿Qué banda es?</h2>

          <p>
            Introduce el nombre de una banda y descubre pistas sobre la banda
            secreta.
          </p>
        </section>

        <section className="search-container">
          <input
            type="text"
            placeholder="Escribe una banda..."
            className="band-input"
          />

          <button className="guess-button">
            Adivinar
          </button>
        </section>

        <section className="game-info">
          <p>🎯 Encuentra la banda secreta en el menor número de intentos.</p>
        </section>

        <section className="table-container">
          <div className="table-header">
            <div>Banda</div>
            <div>País</div>
            <div>Año</div>
            <div>Género</div>
            <div>Miembros</div>
          </div>

          <div className="empty-game">
            <span>🎸</span>
            <p>Tu primer intento aparecerá aquí</p>
          </div>
        </section>
      </main>

      <footer>
        <p>🎸 Bandle · Adivina la banda del día</p>
      </footer>
    </div>
  );
}

export default App;