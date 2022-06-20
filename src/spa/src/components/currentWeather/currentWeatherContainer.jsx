import React, { useContext, useEffect, useReducer } from "react";
import { withRouter } from 'react-router-dom';
import SearchFancyWeatherApi from "../../shared/searchFancyWeatherApi";
import { locationContext } from "../location/locationReducer";
import CurrentWeather from "./currentWeather";
import {
    currentWeatherInitialState,
    CurrentWeatherReducer,
    CURRENT_WEATHER_ACTION,
    InitCurrentWeatherState 
} from "./currentWeatherReducer";


const CurrentWeatherContaienr = (props) => {

    const {locationState, locationDispatch} = useContext(locationContext); 
    const [currentWeatherState, weatherDispatch] = useReducer(
        CurrentWeatherReducer, currentWeatherInitialState, InitCurrentWeatherState
    );

    const fetch = async () => {
        try {
          const response = await SearchFancyWeatherApi(`/query/get-current-weather/?lat=${locationState.location.coordinates.lat}&lon=${locationState.location.coordinates.lon}`)
          
          weatherDispatch({
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