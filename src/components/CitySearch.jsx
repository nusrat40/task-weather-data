import { useState } from "react";

const CitySearch = ({ onAddCity }) => {
  const [city, setCity] = useState("");

  const handleAddCity = () => {
    if (city.trim() === "") return;
    onAddCity(city.trim());
    setCity("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAddCity}>
        Add City
      </button>
    </div>
  );
};

export default CitySearch;