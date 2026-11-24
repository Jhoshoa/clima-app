export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OpenWeatherApiResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
  };
  weather: WeatherCondition[];
  cod: number;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  description: string;
}
