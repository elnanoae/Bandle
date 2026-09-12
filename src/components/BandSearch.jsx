import { useState } from "react";

function BandSearch({ bands, guess, setGuess, onGuess }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(guess.toLowerCase())
  );

  const selectBand = (band) => {
    setGuess(band.name);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
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
        className="guess-button"
        onClick={handleSubmit}
      >
        Adivinar
      </button>
    </section>
  );
}

export default BandSearch;