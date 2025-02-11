import React, { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const GOOGLE_API_KEY = "AIzaSyCXT9t32JaynDAbqjGw5QdVsqZNFWekD_c"; // Replace with your API Key

const GoogleAutocomplete = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setInputValue(place.formatted_address || place.name);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a location..."
          style={{ width: "300px", padding: "10px", fontSize: "16px" }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default GoogleAutocomplete;
