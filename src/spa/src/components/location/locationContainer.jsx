import React, { useContext, useEffect } from "react";
import SearchFancyWeatherApi from "../../shared/searchFancyWeatherApi";
import { locationContext, LOCATION_ACTION } from "./locationReducer";
import Location from "./location";
import { currentWeatherContext, CURRENT_WEATHER_ACTION } from "../currentWeather/currentWeatherReducer";
import { forecastContext, FORECAST_ACTION } from "../forecast/forecastReducer";


const LocationContainer = (props) => {

    const {locationState, locationDispatch} = useContext(locationContext); 
    const {currentWeatherDispatch} = useContext(currentWeatherContext); 
    const {forecastDispatch} = useContext(forecastContext); 


    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      var crd = pos.coords;
      locationDispatch({
        type: LOCATION_ACTION.UPDATE_COORDINATES,
        payload: {
          lat: crd.latitude,
          lon: crd.longitude,
        }
      });
      fetchCountry(crd.latitude, crd.longitude);
    }
    
    const errors = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const fetchCountry = async (lat, lon) => {
      console.log("fetchCountry");
      const response = await SearchFancyWeatherApi(
        `/query/get-country-by-coordinates/?lat=${lat}&lon=${lon}`
      );
      locationDispatch({
        type: LOCATION_ACTION.UPDATE_COUNTRY,
        payload: response.data
      });
    }

    const fetchCoordinatesFromBrowser = async () => {
      try {
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
      } catch (e) {
        console.log(e)
      }
  }
  
  const fetchByZipCode = async () => {
      try {
        const response = await SearchFancyWeatherApi(`/query/get-location-by-zip-code/?zip_code=${locationState.zipCodeSearch}&country_code=${locationState.countryCodeSearch}`)
        locationDispatch({
          type: LOCATION_ACTION.UPDATE_COORDINATES,
          payload: {
            lat: response.data.coordinates.lat,
            lon: response.data.coordinates.lon,
            countryCode: response.data.countryCode,
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      const timeOut = setTimeout(() => {
        if (
          locationState.pristine
        ) {
          fetchCoordinatesFromBrowser()
        }
      }, 500);
      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }

      };
    })

    const handleZipCodeSearch = async (e) => {
      locationDispatch({ 
        type: LOCATION_ACTION.SEARCH,
      });
      currentWeatherDispatch({
        type: CURRENT_WEATHER_ACTION.SEARCH,
      });
      forecastDispatch({
        type: FORECAST_ACTION.SEARCH,
      });
      fetchByZipCode()
    }

    const handleUpdateZipCode = async (e) => {
      const target = e.target
      locationDispatch({ 
        type: LOCATION_ACTION.UPDATE_ZIP_CODE_SEARCH,
        payload: {
          zipCode: target.value,
        }
      })
    }

    const handleResetLocation = async (e) => {
      locationDispatch({ 
        type: LOCATION_ACTION.RESET_LOCATION,
      })
      currentWeatherDispatch({
        type: CURRENT_WEATHER_ACTION.SEARCH,
      });
      forecastDispatch({
        type: FORECAST_ACTION.SEARCH,
      });
      fetchCoordinatesFromBrowser()
    }

    const hanleChangeCountry = async (e) => {
      const target = e.target
      locationDispatch({
        type: LOCATION_ACTION.UPDATE_COUNTRY_CODE_SEARCH,
        payload: {
          countryCode: target.value,
        }
      });
    }
  
    return (
      <>
      <Location
        state={locationState}
        handleResetLocation={handleResetLocation}
        handleZipCodeSearch={handleZipCodeSearch}
        handleUpdateZipCode={handleUpdateZipCode}
        hanleChangeCountry={hanleChangeCountry}
      />
      </>
    )

}

export default LocationContainer