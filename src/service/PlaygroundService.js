import axios from "axios";
import authHeader from "./AuthHeader";



const PLAYGROUND_BASE_URL = "http://localhost:8080/api/pg";

class PlaygroundService {

    getCourts(pgId, sport) {
        return axios.get(`${PLAYGROUND_BASE_URL}/${pgId}/${sport}/courts`, {
            headers: authHeader(),
        });
    }
}

export default new PlaygroundService();