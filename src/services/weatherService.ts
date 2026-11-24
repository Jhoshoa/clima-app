import { OpenWeatherApiResponse, WeatherData } from "@/types/climaTypes";
import { openWeatherClient } from "./axiosClient";
import axios from "axios";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
    const trimmedCity = city.trim();
    
    if (!trimmedCity) {
        throw new Error("Por favor, ingresa un nombre de ciudad válido.");
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new Error("Falta configurar la clave de API de OpenWeatherMap.");
    }

    try {
        const { data } = await openWeatherClient.get<OpenWeatherApiResponse>(
            `/weather`,
            {
                params: {
                    q:trimmedCity,
                    appid: apiKey,
                    units: "metric",
                    lang: "es",
                }
            }
        );

        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(`No se encontró la ciudad "${trimmedCity}". Por favor, verifica el nombre de la ciudad.`);
            }

            if (error.response?.status === 401) {
                throw new Error('API Key invalida o pendiente de activacion.');
            }
        }

        throw new Error('Ocurrio un error al obtener los datos del clima. Intenta mas tarde.');
    }
}
