import "./WeatherDisplayLarge.css";

export function WeatherDisplayLarge(props: any) {
  return (
    <div className="large-weather-display">
      <div className="large-weather-display__text-group">
        <h3 className="large-weather-display__day-of-week">{props.data.dayOfWeek}</h3>
        <h3 className="large-weather-display__current-temp">{props.data.temp}°F</h3>
        <p className="large-weather-display__temp">
          {props.data.high}°F High <span className="large-weather-display__temp--light">{props.data.low}°F Low</span>
        </p>
      </div>
      <div className="large-weather-display__weather-group">
        <img className="large-weather-display__weather-img" src={require("../../icons/" + props.data.icon + ".svg")?.default} alt={"Weather description icon of "+ props.data.weather}></img>
        <p className="large-weather-display__weather-description">{props.data.weather}</p>
      </div>
    </div>
  );
}
