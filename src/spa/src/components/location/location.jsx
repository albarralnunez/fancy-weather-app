import React, { useMemo } from "react";
import countryList from 'react-select-country-list'

const Location = (props) => {

    const {
        state,
        handleResetLocation,
        handleZipCodeSearch,
        handleUpdateZipCode,
        hanleChangeCountry
    } = props

    const countries = useMemo(() => countryList().getData(), [])

    const countrySelector = (
      <div>
        <select onChange={hanleChangeCountry} value={state.location.countryCodeSearch}>
          {countries.map((country) => (
            <option
              value={country.value}
              key={country.value}
            > 
              {country.label}
            </option>
          ))}
        </select>
      </div>
    )

    return (
      <>
        <div className="location-container">
          {
            state.loading 
            ? <b>Loading...</b> 
            : <b>({state.location.coordinates.lat}, {state.location.coordinates.lon})[{state.location.countryCode}]</b>
          }
          <div className="location-container__search">
            <input
              type="text"
              placeholder="Enter zip code"
              value={state.zipCodeSearch}
              onChange={handleUpdateZipCode}
            />
            <div>{countrySelector}</div>
          </div>
          <div>
            <button onClick={handleZipCodeSearch}>Search</button>
          </div>
        </div>
        <div>
          <button onClick={handleResetLocation}>Reset</button>
        </div>
      </>
    )
}

export default Location
