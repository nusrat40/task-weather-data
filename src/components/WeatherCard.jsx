import { useEffect, useState } from "react";
import axios from "axios";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from "react-icons/fa";
import { toast } from "react-toastify";

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

  const handleRemove = () => {
    toast.info(
      <div>
        <p>Are you sure you want to remove {city}?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="btn btn-sm btn-error"
            onClick={() => {
              onRemove(city);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="card bg-base-100 shadow-xl p-6 transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{weather.name}</h2>
      <div className="flex items-center justify-center my-4">
        {getWeatherIcon(weather.weather[0].main)}
      </div>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Temperature:</span> {weather.main.temp}°
          {unit === "metric" ? "C" : "F"}
        </p>
        <p>
          <span className="font-semibold">Humidity:</span> {weather.main.humidity}%
        </p>
        <p>
          <span className="font-semibold">Wind Speed:</span> {weather.wind.speed}{" "}
          {unit === "metric" ? "m/s" : "mph"}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="btn btn-error text-white hover:bg-red-700 transition-colors duration-300"
          onClick={handleRemove}
        >
          Remove
        </button>
        <button
          className="btn bg-[#419dd6] text-white transition-colors duration-300"
          onClick={toggleUnit}
        >
          Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;