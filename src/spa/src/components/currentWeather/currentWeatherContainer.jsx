import React, { useContext, useEffect, useReducer } from "react";
import { withRouter } from 'react-router-dom';
import SearchFancyWeatherApi from "../../shared/searchFancyWeatherApi";
import { locationContext } from "../location/locationReducer";
import CurrentWeather from "./currentWeather";
import {
  currentWeatherContext,
  CURRENT_WEATHER_ACTION,
} from "./currentWeatherReducer";


const CurrentWeatherContaienr = (props) => {

    const {locationState} = useContext(locationContext); 
    const {currentWeatherState, currentWeatherDispatch} = useContext(currentWeatherContext); 

    const fetch = async () => {
        try {
          const response = await SearchFancyWeatherApi(`/query/get-current-weather/?lat=${locationState.location.coordinates.lat}&lon=${locationState.location.coordinates.lon}`)
          
          currentWeatherDispatch({
            type: CURRENT_WEATHER_ACTION.UPDATE_CURRENT_WEATHER,
            payload: response.data
          })
        } catch (e) {
          console.log(e)
        }
      }

    useEffect(() => {
      if (
        !locationState.pristine
        && !locationState.loading
        && currentWeatherState.loading
        ) fetch()
    }, [
      locationState.loading,
      locationState.pristine
    ])

    return (
      <>
        <CurrentWeather state={currentWeatherState} /> 
      </> 
    )
}

export default withRouter(CurrentWeatherContaienr)