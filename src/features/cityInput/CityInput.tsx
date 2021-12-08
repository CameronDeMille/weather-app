import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getWeatherAsync, selectCity, selectWeatherStatus } from "./cityInputSlice";
import { changeCity } from "./cityInputSlice";
import locationicon from "../../icons/location-icon.svg";
import "./CityInput.css";

export function CityInput() {
  const city = useAppSelector(selectCity);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectWeatherStatus);

  const [rememberCity, setRememberCity] = useState(true);
  const [isMobile, setMobile] = useState(window.innerWidth < 641);

  useEffect(() => {
    const savedCoords = {
      lon: localStorage.getItem("lon"),
      lat: localStorage.getItem("lat"),
    };
    dispatch(changeCity(localStorage.getItem("city") || ""));
    if (savedCoords.lon && savedCoords.lat) {
      dispatch(getWeatherAsync({ city: city, rememberCity: rememberCity, coords: { lat: savedCoords.lat, lon: savedCoords.lon } }));
    } else {
      getLocation();
    }
    // eslint-disable-next-line
  }, []);

  const updateMedia = () => {
    setMobile(window.innerWidth < 641);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: String(position.coords.latitude),
        lon: String(position.coords.longitude),
      };
      dispatch(getWeatherAsync({ city: "", rememberCity: rememberCity, coords: coords })).then((data) => {});
    });
  };

  const submitInput = () => {
    if (city !== "") dispatch(getWeatherAsync({ city: city, rememberCity: rememberCity, coords: { lat: "", lon: "" } }));
  };

  return (
    <div className="city-input">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="city-input__input-group">
          <label className="city-input__screen-reader-label" htmlFor="city">
            City
          </label>
          <div className="city-input__icon-container">
            <img className="city-input__icon" src={locationicon} alt="location pin icon"></img>
            <input className="city-input__input" type="text" value={city} onChange={(e) => dispatch(changeCity(e.target.value))} name="city" placeholder="City" required></input>
          </div>
          {!isMobile && (
            <div className="city-input__checkbox-group">
              <input className="city-input__checkbox" name="remember-city" checked={rememberCity} onChange={() => setRememberCity(!rememberCity)} type="checkbox" />
              <label className="city-input__checkbox-label" htmlFor="remember-city">
                Remember city
              </label>
            </div>
          )}
        </div>
        <button className="city-input__button" type="submit" onClick={() => submitInput()}>
          {status !== "loading" && "Get Weather"}
          {status === "loading" && (
            <svg className="city-input__loading animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="city-input__loading--opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="city-input__loading--opacity-50" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>
        {isMobile && (
          <div className="city-input__checkbox-group city-input__checkbox-group--mobile">
            <input className="city-input__checkbox" name="remember-city" checked={rememberCity} onChange={() => setRememberCity(!rememberCity)} type="checkbox" />
            <label className="city-input__checkbox-label" htmlFor="remember-city">
              Remember city
            </label>
          </div>
        )}
        {status === "failed" && (
          <div className="city-input__error-group">
            <svg className="city-input__error-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="city-input__error">The city you entered does not exist, please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
}
