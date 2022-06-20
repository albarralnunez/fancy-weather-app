import React, { useContext, useEffect, useReducer } from "react";
import { withRouter } from 'react-router-dom';
import SearchFancyWeatherApi from "../../shared/searchFancyWeatherApi";
import { locationContext } from "../location/locationReducer";
import Forecast from "./forecast";

import {
    forecastInitialState,
    forecastReducer,
    InitForecastState, 
    FORECAST_ACTION
} from "./forecastReducer";


const ForecastContainer = (props) => {

    const {locationState} = useContext(locationContext); 
    const [forecastState, forecastDispatch] = useReducer(
        forecastReducer, forecastInitialState, InitForecastState
    );

    const fetch = async () => {
        try {
          const response = await SearchFancyWeatherApi(`/query/get-forecast-5d-3h/?lat=${locationState.location.coordinates.lat}&lon=${locationState.location.coordinates.lon}`)
          forecastDispatch({
            type: FORECAST_ACTION.UPDATE_FORECAST,
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
      <Forecast state={forecastState} />
      </> 
    )
}

export default withRouter(ForecastContainer)