export type Condition = {
  text: string;
  icon: string;
  code: number;
};
export type HourlyData = {
  time: string;
  temp_c: number;
  temp_f:number;
  condition: Condition;
};

export type ForecastData = {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f:number;
    mintemp_c: number;
    mintemp_f:number;
    condition: Condition;
    uv:number
  };
  astro:{
    sunrise:string;
    sunset:string;
  }
  hour: HourlyData[];
};
export type WeatherAlert={
  headline:string;
  severity:string;
  event:string
};
export type WeatherAlerts={
  alert:WeatherAlert[]
}
export type LocationWeather={
  name:string;
  forecast:ForecastData[];
  alerts?:WeatherAlert[];
};
export type WeatherData = {
  location: {
    name: string;
    localtime: string;
    country: string;
  };
  current: {
   temp_c: number;
   temp_f: number;
   feelslike_c: number;
   feelslike_f: number;
   humidity: number;
   wind_kph: number;
   condition: Condition;
   maxtemp_c: number;
   maxtemp_f: number;
   mintemp_c: number;
   mintemp_f: number;
   vis_km:number;
   precip_mm:number
};
  forecast: {
    forecastday: ForecastData[];
  };
  alerts?:WeatherAlerts
};