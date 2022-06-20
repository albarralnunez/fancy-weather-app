
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
        default:
            return forecastState;
    }

};
