import { useState } from "react";
import "./index.css";
import bands from "./data/bands.json";

function App() {
  // Elegir una banda secreta aleatoria al iniciar el juego
  const [secretBand] = useState(() => {
    const randomIndex = Math.floor(Math.random() * bands.length);
    return bands[randomIndex];
  });

  // Lo que escribe el jugador
  const [guess, setGuess] = useState("");

  // Lista de intentos realizados
  const [guesses, setGuesses] = useState([]);

  // Solo para comprobar durante el desarrollo
  console.log("Banda secreta:", secretBand);

  // Función para realizar un intento
  const handleGuess = () => {
    // Buscar la banda escrita ignorando mayúsculas/minúsculas
    const band = bands.find(
      (band) =>
        band.name.toLowerCase() === guess.trim().toLowerCase()
    );

    // Si la banda no existe
    if (!band) {
      alert("Esta banda no está en la lista");
      return;
    }

    // Evitar repetir bandas
    if (guesses.some((item) => item.id === band.id)) {
      alert("Ya has probado esta banda");
      return;
    }

    // Añadir el intento
    setGuesses([...guesses, band]);

    // Limpiar el input
    setGuess("");
  };

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
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGuess();
              }
            }}
          />

          <button
            className="guess-button"
            onClick={handleGuess}
          >
            Adivinar
          </button>
        </section>

        <section className="game-info">
          <p>
            🎯 Encuentra la banda secreta en el menor número de intentos.
          </p>

          <p>
            Intentos: {guesses.length}
          </p>
        </section>

        <section className="table-container">
          <div className="table-header">
            <div>Banda</div>
            <div>País</div>
            <div>Año</div>
            <div>Género</div>
            <div>Miembros</div>
          </div>

          {guesses.length === 0 ? (
            <div className="empty-game">
              <span>🎸</span>
              <p>Tu primer intento aparecerá aquí</p>
            </div>
          ) : (
            guesses.map((band) => (
              <div className="guess-row" key={band.id}>
                <div>{band.name}</div>
                <div>{band.country}</div>
                <div>{band.formed}</div>
                <div>{band.genre}</div>
                <div>{band.members}</div>
              </div>
            ))
          )}
        </section>
      </main>

      <footer>
        <p>🎸 Bandle · Adivina la banda</p>
      </footer>
    </div>
  );
}

export default App;