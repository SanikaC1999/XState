import './App.css';

import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log("Error Fetchiing Countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((res) => res.json())
        .then((data) => {
          setState(data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((err) => console.log("Error Fetchiing States:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          setSelectedCity("");
        })
        .catch((err) => console.log("Error Fetchiing Cities:", err));
    }
  }, [selectedState, selectedCountry]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option disabled value="">
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option disabled value="">
            Select State
          </option>
          {state.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option disabled value="">
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <h3>
          You Selected <span>{selectedCountry},</span>
          <span>
            {" "}
            {selectedState},{selectedCity}
          </span>
        </h3>
      )}
    </div>
  );
}
