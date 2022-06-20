import React, { useContext, useEffect } from "react";
import SearchFancyWeatherApi from "../../shared/searchFancyWeatherApi";
import { locationContext, LOCATION_ACTION } from "./locationReducer";
import Location from "./location";


const LocationContainer = (props) => {

    const {locationState, locationDispatch} = useContext(locationContext); 

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
    }
    
    const errors = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
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
        const response = await SearchFancyWeatherApi(`/query/get-location-by-zip-code/?zip_code=${locationState.zip_code_search}&country_code=${locationState.country_search}`)
        locationDispatch({
          type: LOCATION_ACTION.UPDATE_COORDINATES,
          payload: {
            lat: response.data.coordinates.lat,
            lon: response.data.coordinates.lon,
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      const timeOut = setTimeout(() => {
        if (
          locationState.location.coordinates.lat === undefined
        ) {
          fetchCoordinatesFromBrowser()
        }
      }, 4000);
      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
      };
    })

    const handleZipCodeSearch = async (e) => {
      locationDispatch({ 
        type: LOCATION_ACTION.SEARCH,
      })
      fetchByZipCode()
    }

    const handleUpdateZipCode = async (e) => {
      const target = e.target
      locationDispatch({ 
        type: LOCATION_ACTION.UPDATE_ZIP_CODE,
        payload: {
          zip_code: target.value,
        }
      })
    }

    const handleResetLocation = async (e) => {
      locationDispatch({ 
        type: LOCATION_ACTION.RESET_LOCATION,
      })
      fetchCoordinatesFromBrowser()
    }
  
    return (
      <>
      <Location
        state={locationState}
        handleResetLocation={handleResetLocation}
        handleUpdateZipCode={handleUpdateZipCode}
        handleZipCodeSearch={handleZipCodeSearch}
      />
      </>
    )

}

export default LocationContainer