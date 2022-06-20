import React from 'react'


const Forecast = (props) => {
  const {
    state,
  } = props

  const loading = (
    <div>
        ???
    </div>
  )

  const forecastDetail = (
    <div className="forecast-detail">
        <ul>
            {state.forecast.forecast.map((response) => (
                <li  key={response.time}>
                    <ul>
                        <li><b>Time:</b> {response.time}</li>
                        <li><b>Weather:</b> {response.weather}</li>
                        <li><b>Description:</b> {response.description}</li>
                        <li><b>Temperature:</b> {response.temperature}</li>
                        <li><b>Feels Like:</b> {response.feelsLike}</li>
                        <li><b>Pressure:</b> {response.pressure}</li>
                        <li><b>Humidity:</b> {response.humidity}</li>
                    </ul>
                </li>
            ))}
        </ul>
    </div>
  )

  return (
    <>
        {state.loading ? loading : forecastDetail}
    </>
  )
}

export default Forecast
