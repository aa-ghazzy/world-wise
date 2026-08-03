import { useEffect, useState } from "react";
import { CitiesContext } from "./citiesContext";

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function getCitites() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCitites();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCities,
        setIsLoading,
        setCurrentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
