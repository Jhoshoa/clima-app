'use client';

import { useState } from "react";
import toast from "react-hot-toast";

import { SearchBar } from "./SearchBar";
import { LoadingIndicator } from "./LoadingIndicator";
import { WeatherCard } from "./WeatherCard";
import { WeatherData } from "@/types/climaTypes";

import { getWeatherByCity } from "@/services/weatherService";

export function WeatherDashboard() {

    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleSearch = async () => {
        setIsLoading(true);
        setWeather(null);

        try {
            const data = await getWeatherByCity(city);
            setWeather(data);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'No se pudo completar la búsqueda.'
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>Consulta el clima actual</h1>

            <SearchBar
                city={city}
                isLoading={isLoading}
                onCityChange={setCity}
                onSearch={handleSearch}
            />

            {isLoading && <LoadingIndicator />}

            {!isLoading && weather && <WeatherCard weatherData={weather} />}

        </div>
    );
}