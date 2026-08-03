export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type HourlyData = {
  time: string;
  temp_c: number;
  condition: Condition;
};

export type ForecastData = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  };
  hour: HourlyData[];
};

export type WeatherData = {
  location: {
    name: string;
    localtime: string;
    country: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: Condition;
    maxtemp_c: number;
    mintemp_c: number;
  };
  forecast: {
    forecastday: ForecastData[];
  };
};