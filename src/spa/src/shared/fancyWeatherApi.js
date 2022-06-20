import axios from "axios";
import { config } from "../config";

export default axios.create({
    baseURL: config.REACT_APP_API_URL,
});
