import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from "./ipaddress";

const RESERVESLOT_BASE_URL = `http://${IP_ADDRESS}:8080/api/reserve`;

class ReserveSlotService {

    book(body) {
        return axios.post(`${RESERVESLOT_BASE_URL}/slots`, body, {
            headers: authHeader(),
        });
    }
}

export default new ReserveSlotService();