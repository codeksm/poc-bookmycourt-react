import axios from "axios";
import authHeader from "./AuthHeader";



const PLAYGROUND_BASE_URL = "http://192.168.249.221:8080/api/pg";

class PlaygroundService {

    getPgById(pgId) {
        return axios.get(`${PLAYGROUND_BASE_URL}/${pgId}`, {
            headers: authHeader(),
        });
    }

    getCourts(pgId, sport) {
        return axios.get(`${PLAYGROUND_BASE_URL}/${pgId}/${sport}/courts`, {
            headers: authHeader(),
        });
    }
}

export default new PlaygroundService();