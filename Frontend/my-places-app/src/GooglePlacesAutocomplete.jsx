import React, { useState } from "react";

function GooglePlacesAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/autocomplete?input=${input}`);
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    try {
      console.log("Fetching details for:", placeId);
      const response = await fetch(`https://localhost:7077/api/places/place-details?placeId=${placeId}`);
      const data = await response.json();
      console.log("Fetched place details:", data);
      setPlaceDetails(data);
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPlaceDetails(null);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.description);
    setSelectedPlaceId(place.place_id);
    setSuggestions([]);

    fetchPlaceDetails(place.place_id);
  };

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Search places..."
        style={styles.input}
      />

      {suggestions.length > 0 && (
        <ul style={styles.suggestionsList}>
          {suggestions.map((place) => (
            <li key={place.place_id} onClick={() => handleSelect(place)} style={styles.suggestionItem}>
              {place.description}
            </li>
          ))}
        </ul>
      )}

      {selectedPlaceId && (
        <div style={styles.placeId}>
          <strong>Place ID:</strong> {selectedPlaceId}
        </div>
      )}

      {placeDetails ? (
        <div style={styles.placeDetails}>
          <h3>Place Details</h3>
          <pre style={styles.jsonDisplay}>{JSON.stringify(placeDetails, null, 2)}</pre>
        </div>
      ) : (
        <p style={styles.noDetails}>No place details available.</p>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "left",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },
  suggestionsList: {
    listStyleType: "none",
    padding: "8px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    maxHeight: "150px",
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    transition: "background 0.2s",
  },
  placeId: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#e9ecef",
    width: "100%",
  },
  placeDetails: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    width: "100%",
    maxWidth: "600px",
  },
  jsonDisplay: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "14px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  noDetails: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#777",
  },
};

export default GooglePlacesAutocomplete;
