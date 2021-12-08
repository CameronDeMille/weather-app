import { WeatherDisplayLarge } from "../weatherDisplayLarge/WeatherDisplayLarge";
import { WeatherDisplaySmall } from "../weatherDisplaySmall/WeatherDisplaySmall";
import { selectWeather } from "../cityInput/cityInputSlice";
import locationicon from "../../icons/location-icon.svg";
import { useAppSelector } from "../../app/hooks";
import "./WeatherResults.css";

export function WeatherResults() {
  const data = useAppSelector(selectWeather);
  return (
    <>
      <div className="weather-results__hr"></div>
      <div className="weather-results__header-group">
        <img className="weather-results__icon" src={locationicon} alt="location pin icon"></img>
        <h2 className="weather-results__header">
          Current weather in <span className="weather-results__header--city">{data.city}</span>
        </h2>
      </div>
      <WeatherDisplayLarge data={data.current}></WeatherDisplayLarge>
      <div className="weather-results__small-display-group">
        <WeatherDisplaySmall data={data.dayOne}></WeatherDisplaySmall>
        <WeatherDisplaySmall data={data.dayTwo}></WeatherDisplaySmall>
        <WeatherDisplaySmall data={data.dayThree}></WeatherDisplaySmall>
        <WeatherDisplaySmall data={data.dayFour}></WeatherDisplaySmall>
        <WeatherDisplaySmall data={data.dayFive}></WeatherDisplaySmall>
        <WeatherDisplaySmall data={data.daySix}></WeatherDisplaySmall>
      </div>
    </>
  );
}
