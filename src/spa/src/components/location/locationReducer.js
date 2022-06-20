import  { createContext } from "react";

export const locationContext = createContext();

export const locationInitialState = {
    location: {
        coordinates: {
            lat: undefined,
            lon: undefined,
        },
        name: undefined,
        zip: undefined,
        country_code: undefined,
    },
    loading: true,
    pristine: true,
    zip_code_search: "",
    country_search: "US",
};
export const InitLocationState = () => locationInitialState;


export const LOCATION_ACTION = {
    UPDATE_COORDINATES: "UPDATE_COORDINATES",
    SEARCH: "SEARCH",
    UPDATE_ZIP_CODE: "UPDATE_ZIP_CODE",
    RESET_LOCATION: "RESET_LOCATION",
};


export const LocationReducer = (locationState, locationAction) => {
    switch (locationAction.type) {
        case LOCATION_ACTION.UPDATE_COORDINATES:
            return {
                ...locationState,
                location: {
                    ...locationState.location,
                    coordinates: {
                        lat: locationAction.payload.lat,
                        lon: locationAction.payload.lon,
                    },
                },
                pristine: false,
                loading: false,
            };
        case LOCATION_ACTION.SEARCH:
            return {
                ...locationState,
                loading: true,
                pristine: false,
            }
        case LOCATION_ACTION.UPDATE_ZIP_CODE:
            return {
                ...locationState,
                zip_code_search: locationAction.payload.zip_code,
                pristine: false,
            }
        case LOCATION_ACTION.RESET_LOCATION:
            return {
                ...locationState,
                zip_code_search: "",
                loading: true,
                pristine: false,
            }
        
        default: 
            return locationState;
    }
};
