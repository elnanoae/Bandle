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

  // Realizar un intento
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

  // Comparar textos
  const compareText = (value, secretValue) => {
    if (value === secretValue) {
      return "correct";
    }

    return "incorrect";
  };

  // Comparar números
  const compareNumber = (value, secretValue) => {
    // Número exacto
    if (value === secretValue) {
      return {
        status: "correct",
        arrow: "",
      };
    }

    const difference = Math.abs(value - secretValue);

    // Si están a menos de 5 unidades, damos una pista amarilla
    if (difference <= 5) {
      if (value < secretValue) {
        return {
          status: "partial",
          arrow: "⬆️",
        };
      }

      return {
        status: "partial",
        arrow: "⬇️",
      };
    }

    // El valor es menor que el secreto
    if (value < secretValue) {
      return {
        status: "incorrect",
        arrow: "⬆️",
      };
    }

    // El valor es mayor que el secreto
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
                  {/* Banda */}
                  <div
                    className={
                      band.id === secretBand.id
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {band.name}
                  </div>

                  {/* País */}
                  <div
                    className={compareText(
                      band.country,
                      secretBand.country
                    )}
                  >
                    {band.country}
                  </div>

                  {/* Año */}
                  <div className={yearComparison.status}>
                    {band.formed} {yearComparison.arrow}
                  </div>

                  {/* Género */}
                  <div
                    className={compareText(
                      band.genre,
                      secretBand.genre
                    )}
                  >
                    {band.genre}
                  </div>

                  {/* Miembros */}
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