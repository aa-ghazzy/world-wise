import styles from "./CountryList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on the map 👇" />
    );

  //METHID ONE
  //
  //   const countries = cities.map(({ emoji, country }) => ({ emoji, country }));
  //   const notDuplicateCountries = countries.filter(
  //     (item, index, arr) =>
  //       arr.findIndex((c) => c.country === item.country) === index
  //   );

  //METHOD TWO "BEST ONE"
  //
  const countries = [
    ...new Map(
      cities.map(({ emoji, country }) => [country, { emoji, country }])
    ).values(),
  ];

  //METHOD THREE
  //
  //   const countries = cities.reduce((arr, city) => {
  //     if (!arr.map((el) => el.city).includes(city.country))
  //       return [...arr, { country: city.country, emoji: city.emoji }];
  //     else return arr;
  //   }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
