import React from "react";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Google Places Details</h1>
      <GooglePlacesAutocomplete />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // Ensures the search box is at the top
    height: "100vh",
    width: "100%", // Ensures it takes full width
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    paddingTop: "30px", // Adds spacing at the top
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
};

export default App;
