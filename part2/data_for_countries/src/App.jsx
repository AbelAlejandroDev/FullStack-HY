import { useEffect, useState } from "react";
import { getAll, searchByCountrie } from "./services/countries";
import { getCapitalWeather } from "./services/weather";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrieName, setCountrieName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getAll().then((resp) => setCountries(resp.data));
  }, []);

  useEffect(() => {
    if (countrieName.trim().length !== 0) {
      const data = countries.filter((countrie) =>
        countrie.name.common
          .toLowerCase()
          .startsWith(countrieName.toLocaleLowerCase())
      );
      setFilteredCountries(data);
    }
  }, [countrieName]);

  const handleChange = ({ target }) => {
    setCountrieName(target.value);
  };

  const handleClick = (name) => {
    searchByCountrie(name)
      .then((resp) => {
        setCountry(resp.data);
        const capital = resp.data.capital[0];
        getCapitalWeather(capital)
          .then((weatherData) => {
            setWeather(weatherData);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setWeather(null);
          });
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setCountry(null);
        setWeather(null);
      });
  };

  return (
    <>
      <div>
        find counties{" "}
        <input type="text" onChange={handleChange} value={countrieName} />
      </div>
      <div>
        {filteredCountries.length >= 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {filteredCountries.length < 10 &&
          filteredCountries.length !== 1 &&
          filteredCountries.map((country) => (
            <p key={country.name.common}>
              {" "}
              {country.name.common}
              <button onClick={() => handleClick(country.name.common)}>
                show
              </button>
            </p>
          ))}

        {filteredCountries.length === 1 && (
          <>
            <h3>{filteredCountries[0].name.common}</h3>
            <p>capital {filteredCountries[0].capital}</p>
            <p>area {filteredCountries[0].area}</p>
            <br />
            <h4>languages:</h4>
            <ul>
              {Object.entries(filteredCountries[0].languages).map(
                ([key, value]) => (
                  <li key={key}>{value}</li>
                )
              )}
            </ul>
            <img
              style={{ height: "40px" }}
              src={filteredCountries[0].flags.png ?? ""}
              alt={`${filteredCountries[0].name.common} flag`}
            />
          </>
        )}

        {country && (
          <>
            <h3>{country.name.common}</h3>
            <p>capital: {country.capital[0]}</p>
            <p>area: {country.area} km²</p>
            <br />
            <h4>Languages:</h4>
            <ul>
              {Object.entries(country.languages).map(([code, language]) => (
                <li key={code}>{language}</li>
              ))}
            </ul>
            <img
              style={{ height: "40px" }}
              src={country.flags.png ?? ""}
              alt={`${country.name.common} flag`}
            />
            {weather && (
              <>
                <h3>Weather in {country.capital[0]}</h3>
                <p>temperature: {weather.main.temp} °C</p>
                <img
                style={{height:"100px"}}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
