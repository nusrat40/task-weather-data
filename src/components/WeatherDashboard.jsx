import { useState, useEffect } from "react";
import CitySearch from "./CitySearch";
import WeatherCard from "./WeatherCard";
import skyBg from '../assets/sky-sunset.jpg';

const WeatherDashboard = () => {
  const [cities, setCities] = useState(() => {
    const storedCities = localStorage.getItem("cities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const addCity = (city) => {
    if (!cities.includes(city)) {
      setCities((prevCities) => [...prevCities, city]);
    }
  };

  const removeCity = (city) => {
    setCities((prevCities) => prevCities.filter((c) => c !== city));
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url(${skyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Weather Dashboard
        </h1>
        
        {/* Search Input for Filtering Cities */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="input input-bordered w-full max-w-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <CitySearch onAddCity={addCity} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCities.length === 0 ? (
            <p className="text-center text-white col-span-full">
              {cities.length === 0 ? "No cities added." : "No matching cities found."}
            </p>
          ) : (
            filteredCities.map((city) => (
              <WeatherCard key={city} city={city} onRemove={removeCity} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;