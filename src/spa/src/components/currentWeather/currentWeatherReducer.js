
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
        default:
            return currentWeatherState;
    }

};
