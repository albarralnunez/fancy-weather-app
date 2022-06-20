import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PageNotFound from './shared/404'
import { 
    LocationReducer,
    locationInitialState,
    InitLocationState,
    locationContext,
 } from './components/location/locationReducer'
import LocationContainer from './components/location/locationContainer'
import CurrentWeatherContainer from './components/currentWeather/currentWeatherContainer'
import ForecastContainer from './components/forecast/forecastContainer'


const App = () => {

    const [locationState, locationDispatch] = React.useReducer(
        LocationReducer, 
        locationInitialState,
        InitLocationState
    )

    return (
        <locationContext.Provider value={{ locationState, locationDispatch }}>
        <div>
            <div><LocationContainer/></div>
            <hr />
            <Router basename="/">
                <div>
                <ul>
                    <li>
                    <Link to="/">Weather</Link>
                    </li>
                    <li>
                    <Link to="/forecast">Forecast</Link>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route path="/" exact component={CurrentWeatherContainer}/>
                    <Route
                    path="/forecast"
                    exact
                    component={ForecastContainer}/>
                    <Route component={PageNotFound} />
                </Switch>
                </div>
            </Router>
        </div>
        </locationContext.Provider>
    )
}

export default App
