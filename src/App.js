import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const cities = [
  "Ahmedabad", "Surat", "Rajkot", "Vadodara", "Bhavnagar",
  "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Mehsana"
];

const API_KEY = "35ff725dd1ac46568d2164607220803";

function App() {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedCity}&days=1&aqi=no&alerts=no`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedCity]);

  return (
    <div className="bg-light min-h-screen py-5">
      <div className="container text-center">
        <h1 className="display-4 text-primary mb-5">🌍 Gujarat Weather App</h1>

        <div className="mb-4">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="form-select form-select-lg mb-3"
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-info font-weight-bold">Loading weather data...</div>
        )}

        {error && (
          <div className="text-danger font-weight-bold">{`Error: ${error}`}</div>
        )}

        {weatherData && !loading && !error && (
          <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <h2 className="card-title text-primary">
                {weatherData.location.name}, {weatherData.location.region}
              </h2>
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                  className="w-25"
                />
              </div>
              <p className="text-secondary">
                <strong>Condition:</strong> {weatherData.current.condition.text}
              </p>
              <p className="text-info">
                <strong>Temperature:</strong> {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
              </p>
              <p className="text-info">
                <strong>Humidity:</strong> {weatherData.current.humidity}%
              </p>
              <p className="text-info">
                <strong>Wind Speed:</strong> {weatherData.current.wind_kph} kph
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
