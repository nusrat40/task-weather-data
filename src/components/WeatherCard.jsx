import { useEffect, useState } from "react";
import axios from "axios";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from "react-icons/fa";

const API_KEY = "1d807683083495a1385c78216ed002d7";

const WeatherCard = ({ city, onRemove }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        );
        setWeather(response.data);
      } catch (error) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <FaSun className="text-yellow-500 text-4xl" />;
      case "Clouds":
        return <FaCloud className="text-gray-500 text-4xl" />;
      case "Rain":
        return <FaCloudRain className="text-blue-500 text-4xl" />;
      case "Snow":
        return <FaSnowflake className="text-blue-300 text-4xl" />;
      case "Thunderstorm":
        return <FaBolt className="text-yellow-700 text-4xl" />;
      default:
        return <FaSun className="text-yellow-500 text-4xl" />;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <div className="flex items-center justify-center my-2">
        {getWeatherIcon(weather.weather[0].main)}
      </div>
      <p>Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
      <div className="flex justify-between mt-4">
        <button className="btn btn-error" onClick={() => onRemove(city)}>
          Remove
        </button>
        <button className="btn btn-secondary" onClick={toggleUnit}>
          Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;