import { useContext } from "react";
import { CitiesContext } from "./citiesContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was called outside of its provider");
  return context;
}

export { useCities };
