import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Weather = () => {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
;

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      setResponse(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3dc4e486280147cce43c7d677958fcf9`
      );

      const jsonData = await res.json();

      if (res.ok) {
        setResponse(jsonData);
      } else {
        setResponse(null);
        setError("Please enter a valid city name.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-yellow-800">
          Weather App
        </h1>

        <div className="flex items-center bg-white p-2 rounded-lg shadow space-x-2">
          <input
            onChange={handleInputChange}
            className="flex-grow p-2 outline-none"
            type="text"
            name="city"
            placeholder="Enter city name"
            value={city}
          />
          <button
            onClick={handleSubmit}
            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700"
          >
            <FaMagnifyingGlass className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-center font-semibold">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-yellow-800 text-center font-semibold">
            Loading...
          </div>
        )}

        {response && !error && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{response.name}</h2>
            <h2 className="text-3xl font-semibold text-yellow-700">
              {Math.round(response.main.temp - 273.15)}°C
            </h2>
            <p className="text-xl text-gray-700">
              Humidity: {response.main.humidity}%
            </p>
            <p className="text-xl text-gray-700">
              Wind Speed: {response.wind.speed} km/h
            </p>
            <p className="text-lg text-gray-500">{response.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
