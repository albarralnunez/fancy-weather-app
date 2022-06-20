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
        countryCode: "",
    },
    loading: true,
    pristine: true,
    zipCodeSearch: "",
    countryCodeSearch: "",
};
export const InitLocationState = () => locationInitialState;


export const LOCATION_ACTION = {
    UPDATE_COORDINATES: "UPDATE_COORDINATES",
    SEARCH: "SEARCH",
    UPDATE_ZIP_CODE: "UPDATE_ZIP_CODE",
    RESET_LOCATION: "RESET_LOCATION",
    UPDATE_COUNTRY_CODE_SEARCH: "UPDATE_COUNTRY_CODE_SEARCH",
    UPDATE_COUNTRY: "UPDATE_COUNTRY",
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
                countryCode: locationAction.payload.countryCode,
            },
            pristine: false,
            loading: false,
        };
    case LOCATION_ACTION.SEARCH:
        return {
            ...locationState,
            loading: true,
            pristine: false,
        };
    case LOCATION_ACTION.UPDATE_ZIP_CODE_SEARCH:
        return {
            ...locationState,
            zipCodeSearch: locationAction.payload.zipCode,
            pristine: false,
        };
    case LOCATION_ACTION.UPDATE_COUNTRY_CODE_SEARCH:
        return {
            ...locationState,
            countryCodeSearch: locationAction.payload.countryCode,
            pristine: false,
        };
    case LOCATION_ACTION.RESET_LOCATION:
        return {
            ...locationState,
            zipCodeSearch: "",
            loading: true,
            pristine: false,
        };
    case LOCATION_ACTION.UPDATE_COUNTRY: 
        return {
            ...locationState,
            location: {
                ...locationState.location,
                countryCode: locationAction.payload.countryCode,
                name: locationAction.payload.countryName,
            },
            countryCodeSearch: locationAction.payload.countryCode,
            pristine: false,
            loading: false,
        }
    default: 
        return locationState;
    }
};
