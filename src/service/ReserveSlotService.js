import axios from "axios";
import authHeader from "./AuthHeader";

const RESERVESLOT_BASE_URL = "http://192.168.1.4:8080/api/reserve";

class ReserveSlotService {

    book(body) {
        return axios.post(`${RESERVESLOT_BASE_URL}/slots`, body, {
            headers: authHeader(),
        });
    }
}

export default new ReserveSlotService();