import React from 'react'


const CurrentWeather = (props) => {
  const {
    state,
  } = props

  const loading = (
    <div>
        ???
    </div>
  )

  const weatherDetail = (
    <div className="weather-detail">
        <ul>
            <li><b>Weather:</b> {state.currentWeather.weather}</li>
            <li><b>Description:</b> {state.currentWeather.description}</li>
            <li><b>Temperature:</b> {state.currentWeather.temperature}</li>
            <li><b>Feels Like:</b> {state.currentWeather.feelsLike}</li>
            <li><b>Pressure:</b> {state.currentWeather.pressure}</li>
            <li><b>Humidity:</b> {state.currentWeather.humidity}</li>
        </ul>
    </div>
  )

  return (
    <>
        {state.loading ? loading : weatherDetail}
    </>
  )
}

export default CurrentWeather
