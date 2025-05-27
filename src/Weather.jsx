import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import countryCodeMap from "./CountryCode";
import weatherImageMap from "./WeatherMap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
const apiKey = import.meta.env.VITE_API_KEY;

const Weather = () => {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getCountryName = (code) => {
    return countryCodeMap[code] || code;
  };

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-red-200 to-green-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center text-yellow-800 drop-shadow">
          Weather App
        </h1>

        <div className="flex items-center bg-white p-2 rounded-xl shadow-lg space-x-2 focus:outline-none transition-all">
          <input
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 text-lg rounded-md outline-none"
            type="text"
            name="city"
            placeholder="Enter city name"
            value={city}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaMagnifyingGlass className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-center font-semibold transition-all">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-gray-700 text-center flex justify-center items-center gap-2 font-semibold animate-pulse">
            <p>Loading...</p>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        )}

        {response && !error && (
          <div
            className="bg-gradient-to-tl from-green-300 via-blue-200 to-red-100
   rounded-2xl shadow-xl p-6 text-center space-y-4 transition-all transform hover:scale-105"
          >
            <div className="flex justify-center">
              <img
                src={
                  weatherImageMap[response.weather[0].main] || "/default.png"
                }
                alt={response.weather[0].main}
                className="md:w-32 md:h-30 w-20 h-24 transition-opacity duration-500"
              />
            </div>
            <p className="text-2xl text-white capitalize">
              {response.weather[0].main}
            </p>
            <h2 className="text-2xl font-semi-bold text-white">
              {`${response.name}, ${getCountryName(response.sys.country)}`}
            </h2>
            <h2 className="text-3xl font-semibold text-gray-700">
              {Math.round(response.main.temp - 273.15)}°C
            </h2>
            <div className="flex justify-center gap-4 items-center">
              <WiHumidity className="text-4xl text-white" />
              <p className="text-xl text-white">
                Humidity: {response.main.humidity}%
              </p>
            </div>

            <div className="flex justify-center gap-4 items-center">
              <img src="./public/wind.png" alt="" width={24} h={24} />
              <p className="text-xl text-white">
                Wind Speed: {response.wind.speed} km/h
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
