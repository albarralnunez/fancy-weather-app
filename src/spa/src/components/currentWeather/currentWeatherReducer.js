import { createContext } from "react";

export const currentWeatherContext = createContext();

export const currentWeatherInitialState = {
    currentWeather: {
        weather: undefined,
        description: undefined,
        temperature: undefined,
        feelsLike: undefined,
        pressure: undefined,
        humidity: undefined, 
    },
    loading: true,
    pristine: true, 
};

export const InitCurrentWeatherState = () => currentWeatherInitialState;

export const CURRENT_WEATHER_ACTION = {
    UPDATE_CURRENT_WEATHER: "UPDATE_CURRENT_WEATHER",
    SEARCH: "SEARCH",
};


export const CurrentWeatherReducer = (currentWeatherState, currentWeatherAction) => {
    switch (currentWeatherAction.type) {
        case CURRENT_WEATHER_ACTION.UPDATE_CURRENT_WEATHER:
            const res = {
                currentWeather: currentWeatherAction.payload,
                pristine: false,
                loading: false,
            }
            return res
        case CURRENT_WEATHER_ACTION.SEARCH:
            return {
                ...currentWeatherState,
                loading: true,
                pristine: false,
            }
        default:
            return currentWeatherState;
    }

};
