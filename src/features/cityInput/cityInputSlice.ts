import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import API from '../../app/api'

export interface WeatherState {
  data: {
    city: string;
    inputCity: string;
    current: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
      temp: number;
    }
    dayOne: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
    dayTwo: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
    dayThree: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
    dayFour: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
    dayFive: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
    daySix: {
      dayOfWeek: string;
      high: number;
      low: number;
      icon: string;
      weather: string;
    }
  }
  status: 'idle' | 'loading' | 'failed';

}

const initialState: WeatherState = {
  data: {
    city: '',
    inputCity: '',
    current: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: '',
      temp: -999
    },
    dayOne: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
    dayTwo: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
    dayThree: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
    dayFour: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
    dayFive: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
    daySix: {
      dayOfWeek: '',
      high: -999,
      low: -999,
      icon: '',
      weather: ''
    },
  },
  status: 'idle',
};

function getDayOfWeek(timestamp: number) {
  const x = new Date(timestamp * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[x.getDay()];
  return dayOfWeek;
}

export const getWeatherAsync = createAsyncThunk(
  'cityInput/fetchWeather',
  async (data: { city: string, rememberCity: boolean, coords: { lat: string | null, lon: string | null } }) => {
    let coords = {
      lat: data.coords.lat,
      lon: data.coords.lon
    };
    let city = data.city

    // If there are no coords
    if (!data.coords.lat && !data.coords.lon) {
      const forecastResponse = await API.get('/data/2.5/forecast?q=' + data.city + '&appid=c992141e13350085201ac4d797865f73&units=imperial');
      coords = forecastResponse.data.city.coord;
    }

    if (!data.city) {
      const reverseGeoCodeResponse = await API.get('/geo/1.0/reverse?lat=' + coords.lat + '&lon=' + coords.lon + '&appid=c992141e13350085201ac4d797865f73');
      city = reverseGeoCodeResponse.data[0].name;
    }

    if (data.rememberCity) {
      localStorage.setItem('lat', coords.lat || "");
      localStorage.setItem('lon', coords.lon || "");
      localStorage.setItem('city', city);
    }

    const oneCallResponse = await API.get('/data/2.5/onecall?lat=' + coords.lat + '&lon=' + coords.lon + '&appid=c992141e13350085201ac4d797865f73&units=imperial&exclude=hourly,alerts,minutely');
    
    const dataResult = {
      inputCity: city,
      city: city,
      current: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.current.dt),
        high: Math.round(oneCallResponse.data.daily[0].temp.max),
        low: Math.round(oneCallResponse.data.daily[0].temp.min),
        icon: oneCallResponse.data.current.weather[0].icon,
        weather: oneCallResponse.data.current.weather[0].main,
        temp: Math.round(oneCallResponse.data.current.temp),
      },
      dayOne: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[1].dt),
        high: Math.round(oneCallResponse.data.daily[1].temp.max),
        low: Math.round(oneCallResponse.data.daily[1].temp.min),
        icon: oneCallResponse.data.daily[1].weather[0].icon,
        weather: oneCallResponse.data.daily[1].weather[0].main
      },
      dayTwo: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[2].dt),
        high: Math.round(oneCallResponse.data.daily[2].temp.max),
        low: Math.round(oneCallResponse.data.daily[2].temp.min),
        icon: oneCallResponse.data.daily[2].weather[0].icon,
        weather: oneCallResponse.data.daily[2].weather[0].main
      },
      dayThree: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[3].dt),
        high: Math.round(oneCallResponse.data.daily[3].temp.max),
        low: Math.round(oneCallResponse.data.daily[3].temp.min),
        icon: oneCallResponse.data.daily[3].weather[0].icon,
        weather: oneCallResponse.data.daily[3].weather[0].main
      },
      dayFour: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[4].dt),
        high: Math.round(oneCallResponse.data.daily[4].temp.max),
        low: Math.round(oneCallResponse.data.daily[4].temp.min),
        icon: oneCallResponse.data.daily[4].weather[0].icon,
        weather: oneCallResponse.data.daily[4].weather[0].main
      },
      dayFive: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[5].dt),
        high: Math.round(oneCallResponse.data.daily[5].temp.max),
        low: Math.round(oneCallResponse.data.daily[5].temp.min),
        icon: oneCallResponse.data.daily[5].weather[0].icon,
        weather: oneCallResponse.data.daily[5].weather[0].main
      },
      daySix: {
        dayOfWeek: getDayOfWeek(oneCallResponse.data.daily[6].dt),
        high: Math.round(oneCallResponse.data.daily[6].temp.max),
        low: Math.round(oneCallResponse.data.daily[6].temp.min),
        icon: oneCallResponse.data.daily[6].weather[0].icon,
        weather: oneCallResponse.data.daily[6].weather[0].main
      }
    }

    return dataResult;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.data.inputCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWeatherAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getWeatherAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const { changeCity } = weatherSlice.actions;

export const selectCity = (state:RootState) => state.weather.data.inputCity;
export const selectWeather = (state: RootState) => state.weather.data;
export const selectWeatherStatus = (state: RootState) => state.weather.status;


export default weatherSlice.reducer;
