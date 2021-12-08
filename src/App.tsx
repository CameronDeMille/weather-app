import React from "react";
import logoicon from "./icons/logo-icon.svg";
import forecasticon from "./icons/forecast-icon.svg";

import "./App.css";
import { CityInput } from "./features/cityInput/CityInput";
import { WeatherResults } from "./features/weatherResults/WeatherResults";
import { useAppSelector } from "./app/hooks";
import { selectWeather } from "./features/cityInput/cityInputSlice";

function App() {
  const data = useAppSelector(selectWeather);
  const loadedData = data.city !== '';
  return (
    <div className="app">
      <div className="accent-bar"></div>
      <div className="container">
        { !loadedData  && <img src={logoicon} alt="logo"></img>}
        { !loadedData  &&<h1 className="title">Search by city to get the current and five day forecasted weather</h1>}
        { loadedData  &&<p className="sub-title">Search another city</p>}
        <CityInput></CityInput>
        { !loadedData  && <img className="forecast-icon" src={forecasticon} alt="forecast icon"></img>}
        { loadedData && <WeatherResults></WeatherResults>}
      </div>
    </div>
  );
}

export default App;
