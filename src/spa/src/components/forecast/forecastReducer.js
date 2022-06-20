import { createContext } from "react";

export const forecastContext = createContext();

export const forecastInitialState = {
    forecast: {
        forecast: []
    },
    loading: true,
    pristine: true, 
};


export const InitForecastState = () => forecastInitialState;

export const FORECAST_ACTION = {
    UPDATE_FORECAST: "UPDATE_FORECAST",
    SEARCH: "SEARCH",
};


export const forecastReducer = (forecastState, forecastAction) => {
    switch (forecastAction.type) {
        case FORECAST_ACTION.UPDATE_FORECAST:
            const res = {
                forecast: forecastAction.payload,
                pristine: false,
                loading: false,
            }
            return res
        case FORECAST_ACTION.SEARCH:
            return {
                ...forecastState,
                loading: true,
                pristine: false,
            }
        default:
            return forecastState;
    }

};
