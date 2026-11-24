'use client'

import { FormEvent } from "react";

interface SearchBarProps {
    city: string;
    isLoading: boolean;
    onCityChange: (city: string) => void;
    onSearch: () => void;
}

export function SearchBar({
    city,
    isLoading,
    onCityChange,
    onSearch
}: SearchBarProps) {
    const isEmpty = city.trim().length === 0;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEmpty || isLoading) return;
        
        onSearch();
        
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                className="search-input"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                placeholder="Ingresa el nombre de la ciudad"
                aria-label="Nombre de la ciudad"
            />
            <button
                type="submit"
                className="btn"
                disabled={isEmpty || isLoading}
            >
                {isLoading ? "Buscando..." : "Buscar"}
            </button>
        </form>
    );
}
