import { useState } from "react";
import "./index.css";
import bands from "./data/bands.json";
import BandSearch from "./components/BandSearch";

const MAX_ATTEMPTS = 8;

function App() {
  const [secretBand] = useState(() => {
    const randomIndex = Math.floor(Math.random() * bands.length);
    return bands[randomIndex];
  });

  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  console.log("Banda secreta:", secretBand);

  const gameFinished = gameWon || gameLost;

  const handleGuess = () => {
    if (gameFinished) return;

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

    const newGuesses = [...guesses, band];

    setGuesses(newGuesses);
    setGuess("");

    // Comprobar si ha acertado
    if (band.id === secretBand.id) {
      setGameWon(true);
      return;
    }

    // Comprobar si ha llegado al límite
    if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameLost(true);
    }
  };

  const compareText = (value, secretValue) => {
    if (value === secretValue) {
      return "correct";
    }

    return "incorrect";
  };

  const compareGenre = (band, secretBand) => {
    if (band.genre === secretBand.genre) {
      return "correct";
    }

    if (band.genreCategory === secretBand.genreCategory) {
      return "partial";
    }

    return "incorrect";
  };

  const compareNumber = (
    value,
    secretValue,
    partialDifference = 5
  ) => {
    if (value === secretValue) {
      return {
        status: "correct",
        arrow: "",
      };
    }

    const difference = Math.abs(value - secretValue);

    if (difference <= partialDifference) {
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
            Introduce el nombre de una banda y descubre pistas sobre
            la banda secreta.
          </p>
        </section>

        {!gameFinished && (
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

        {gameLost && (
          <div className="lose-message">
            💀 ¡Te has quedado sin intentos!
            <br />
            La banda era:{" "}
            <strong>{secretBand.name}</strong>
          </div>
        )}

        <section className="game-info">
          <p>
            🎯 Encuentra la banda secreta en el menor número de
            intentos.
          </p>

          <p>
            Intentos: {guesses.length} / {MAX_ATTEMPTS}
          </p>
        </section>

        <section className="table-container">
          <div className="table-header">
            <div>Banda</div>
            <div>País</div>
            <div>Año</div>
            <div>Género</div>
            <div>Miembros</div>
            <div>Álbumes</div>
            <div>Estado</div>
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
                secretBand.formed,
                5
              );

              const membersComparison = compareNumber(
                band.members,
                secretBand.members,
                1
              );

              const albumsComparison = compareNumber(
                band.albums,
                secretBand.albums,
                2
              );

              const statusComparison = compareText(
                band.status,
                secretBand.status
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

                  <div className={compareGenre(band, secretBand)}>
                    {band.genre}
                  </div>

                  <div className={membersComparison.status}>
                    {band.members} {membersComparison.arrow}
                  </div>

                  <div className={albumsComparison.status}>
                    {band.albums} {albumsComparison.arrow}
                  </div>

                  <div className={statusComparison}>
                    {band.status}
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