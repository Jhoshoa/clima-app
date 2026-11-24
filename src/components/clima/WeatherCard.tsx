import { WeatherData } from "@/types/climaTypes";

interface WeatherCardProps {
    weatherData: WeatherData;
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
    return (
        <article>
            <h2>{weatherData.city}, {weatherData.country}</h2>
            <p>
                <strong>Temperatura:</strong> {weatherData.temperature}°C
            </p>

            <p>
                <strong>Humedad:</strong> {weatherData.humidity}%
            </p>

            <p>
                <strong>Descripción:</strong> {weatherData.description}
            </p>
        </article>
    )
}