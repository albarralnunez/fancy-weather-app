import { keysToCamel } from './toCamel'
import axios from 'axios'
import fancyWeatherApi from './fancyWeatherApi'


const makeRequestCreator = () => {
  let cancel

  return async (path, params) => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel()
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source()
    try {
      const response = await fancyWeatherApi(path, {
        cancelToken: cancel.token,
        params: params
      })
      console.log(path)
      const newResponse = keysToCamel(response)
      return newResponse
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message)
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message)
        throw error
      }
    }
  }
}

const SearchFancyWeatherApi = makeRequestCreator()

export default SearchFancyWeatherApi
