import { keysToCamel } from "./toCamel";
import axios from "axios";
import fancyWeatherApi from "./fancyWeatherApi";


const makeRequestCreator = () => {
    let cancel;

    return async (path, params) => {
        try {
            const response = await fancyWeatherApi(path, {
                params: params
            });
            console.log(path);
            const newResponse = keysToCamel(response);
            return newResponse;
        } catch (error) {
            console.log("Something went wrong: ", error.message);
            throw error;
        }
    };
};

const SearchFancyWeatherApi = makeRequestCreator();

export default SearchFancyWeatherApi;
