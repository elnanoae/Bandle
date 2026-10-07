import { useState } from "react";

function BandSearch({ bands, guess, setGuess, onGuess }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtrar bandas según lo que escribe el usuario
  const filteredBands = bands
    .filter((band) =>
      band.name.toLowerCase().includes(guess.trim().toLowerCase())
    )
    .slice(0, 5);

  // Seleccionar una banda de las sugerencias
  const selectBand = (band) => {
    setGuess(band.name);
    setShowSuggestions(false);
  };

  // Realizar intento
  const handleSubmit = () => {
    if (guess.trim() === "") {
      return;
    }

    onGuess();
    setShowSuggestions(false);
  };

  return (
    <section className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Escribe una banda..."
          className="band-input"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (guess.trim() !== "") {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        {showSuggestions && guess.trim() !== "" && (
          <div className="suggestions">
            {filteredBands.length > 0 ? (
              filteredBands.map((band) => (
                <button
                  key={band.id}
                  type="button"
                  className="suggestion"
                  onClick={() => selectBand(band)}
                >
                  🎸 {band.name}
                </button>
              ))
            ) : (
              <div className="no-results">
                No se encontraron bandas
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        className="guess-button"
        onClick={handleSubmit}
      >
        Adivinar
      </button>
    </section>
  );
}

export default BandSearch;