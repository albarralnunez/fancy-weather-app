import React from "react";

const Location = (props) => {

    const {
        state,
        handleResetLocation,
        handleZipCodeSearch,
        handleUpdateZipCode
    } = props

    return (
      <>
        <div className="location-container">
          {
            state.loading 
            ? <b>Loading...</b> 
            : <b>({state.location.coordinates.lat}, {state.location.coordinates.lon})</b>
          }
          <br />
          <div>{state.location.countryCode}</div>          
          <div className="location-container__search">
            <input
              type="text"
              placeholder="Enter zip code"
              value={state.zipCodeSearch}
              onChange={handleUpdateZipCode}
            />
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
