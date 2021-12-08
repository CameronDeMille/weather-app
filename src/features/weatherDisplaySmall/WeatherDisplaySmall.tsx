import "./WeatherDisplaySmall.css";

export function WeatherDisplaySmall(props: any) {
  return (
    <div className="small-weather-display">
      <div className="small-weather-display__text-group">
        <h3 className="small-weather-display__day-of-week">{props.data.dayOfWeek}</h3>
        <p className="small-weather-display__temp">
          {props.data.high}°<span className="small-weather-display__temp--light">{props.data.low}°</span>
        </p>
      </div>
      <div className="small-weather-display__weather-group">
        <img src={require("../../icons/" + props.data.icon + ".svg")?.default} alt={"Weather description icon of "+ props.data.weather}></img>
        <p className="small-weather-display__weather-description">{props.data.weather}</p>
      </div>
    </div>
  );
}
