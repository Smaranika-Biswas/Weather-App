import { useEffect, useState } from "react";
import "./App.css";
import CurrentData from "./components/CurrentData";
import ForecastData from "./components/ForecastData";

const searchURL =
  "https://api.weatherapi.com/v1/search.json?key=a98a94a9ca204e809cd50811231209&q=";

const weatherData = (city: any) =>
  `https://api.weatherapi.com/v1/forecast.json?key=a98a94a9ca204e809cd50811231209&q=${city}&days=5&aqi=yes&alerts=yes`;

function App() {
  const [city, setCity] = useState(""); //input the city name
  const [clicked, setClicked] = useState(false); //close suggestion after click
  const [current, setCurrent] = useState(); //current weather data
  const [location, setLocation] = useState([]);
  const [forecast, setForecast] = useState(); //forecast weather data
  const [citySuggestion, setCitySuggestion] = useState([]); //search options
  const [store, setStore] = useState([]);

  const handleClick = async (clickedCity: any) => {
    const res = await fetch(weatherData(clickedCity)); //fetching weather data
    const data = await res.json();
    setCity(clickedCity);
    setClicked(true);
    // console.log("obj : ", city);
    // console.log("city: ", clickedCity);

    setLocation(clickedCity);
    setCurrent(data.current);
    setForecast(data.forecast);
    setCity("");
    // console.log(data);
    if (!store.includes(data.location.name)) {
      setStore((prev: any) => [...prev, data.location.name]);
      // console.log(data.location.name);
    }
    // console.log(store);
  };

  useEffect(() => {
    const fetchSuggestion = async () => {
      const response = await fetch(searchURL + city);
      const data = await response.json();

      const cityData = data.map(
        (curData: any) =>
          `${curData.name}, ${curData.region}, ${curData.country}`
      );
      // console.log("nknkjkuujo:  ",cityData);
      setCitySuggestion(cityData);
    };

    //when click=true && length of city name > 2
    if (!clicked && city.length > 2) {
      fetchSuggestion(); //
    } else {
      setCitySuggestion([]);
      setClicked(false);
    }
  }, [city]);

  return (
    <>
      <div className="App">
        <div className="header">
          <h3 style={{ marginLeft: "36%" }}>Weather Report</h3>
          {/* <button className="convert-F" onClick={handleF}>&deg;F</button>
          <button className="convert-C" onClick={handleC}>&deg;C</button> */}
        </div>

        <div className="storeLocation">
          {store.map((item: any, index: any) => (
            <div
              className="items"
              key={index}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="app-body">
          <input
            type="text"
            className="cityBox"
            placeholder="Enter your location"
            value={city}
            onChange={(e) => setCity(e.target.value)} //typed city
          />
          <div>
            {citySuggestion.length > 0 && (
              <div className="suggestionWrapper">
                {citySuggestion.map((curCity, index) => (
                  <div
                    className="suggestion"
                    key={index}
                    onClick={() => handleClick(curCity)}
                  >
                    {curCity}
                  </div>
                ))}
              </div>
            )}
          </div>
          {current && <CurrentData current={current} city={location} />}
        </div>
        {forecast && <ForecastData forecast={forecast} city={location} />}
      </div>
    </>
  );
}

export default App;
