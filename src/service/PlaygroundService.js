import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from "./ipaddress";



const PLAYGROUND_BASE_URL = `http://${IP_ADDRESS}:8080/api/pg`;

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