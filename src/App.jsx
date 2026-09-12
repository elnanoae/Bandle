import { useState } from "react";
import "./index.css";
import bands from "./data/bands.json";
import BandSearch from "./components/BandSearch";

function App() {
  // Elegir una banda secreta aleatoria
  const [secretBand] = useState(() => {
    const randomIndex = Math.floor(Math.random() * bands.length);
    return bands[randomIndex];
  });

  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  // Solo durante el desarrollo
  console.log("Banda secreta:", secretBand);

  const handleGuess = () => {
    if (gameWon) return;

    const band = bands.find(
      (band) =>
        band.name.toLowerCase() === guess.trim().toLowerCase()
    );

    if (!band) {
      alert("Esta banda no está en la lista");
      return;
    }

    if (guesses.some((item) => item.id === band.id)) {
      alert("Ya has probado esta banda");
      return;
    }

    setGuesses([...guesses, band]);
    setGuess("");

    // Comprobar si ha ganado
    if (band.id === secretBand.id) {
      setGameWon(true);
    }
  };

  // Comparar texto
  const compareText = (value, secretValue) => {
    return value === secretValue ? "correct" : "incorrect";
  };

  // Comparar números
  const compareNumber = (value, secretValue) => {
    if (value === secretValue) {
      return {
        status: "correct",
        arrow: "",
      };
    }

    if (value < secretValue) {
      return {
        status: "incorrect",
        arrow: "⬆️",
      };
    }

    return {
      status: "incorrect",
      arrow: "⬇️",
    };
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

        {!gameWon && (
          <BandSearch
            bands={bands}
            guess={guess}
            setGuess={setGuess}
            onGuess={handleGuess}
          />
        )}

        {gameWon && (
          <div className="win-message">
            🎉 ¡Correcto! Has adivinado la banda:{" "}
            <strong>{secretBand.name}</strong>
          </div>
        )}

        <section className="game-info">
          <p>
            🎯 Encuentra la banda secreta en el menor número de intentos.
          </p>

          <p>Intentos: {guesses.length}</p>
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
            guesses.map((band) => {
              const yearComparison = compareNumber(
                band.formed,
                secretBand.formed
              );

              const membersComparison = compareNumber(
                band.members,
                secretBand.members
              );

              return (
                <div className="guess-row" key={band.id}>
                  <div
                    className={
                      band.id === secretBand.id
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {band.name}
                  </div>

                  <div
                    className={compareText(
                      band.country,
                      secretBand.country
                    )}
                  >
                    {band.country}
                  </div>

                  <div className={yearComparison.status}>
                    {band.formed} {yearComparison.arrow}
                  </div>

                  <div
                    className={compareText(
                      band.genre,
                      secretBand.genre
                    )}
                  >
                    {band.genre}
                  </div>

                  <div className={membersComparison.status}>
                    {band.members} {membersComparison.arrow}
                  </div>
                </div>
              );
            })
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