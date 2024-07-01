import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from "./ipaddress";


const RESERVESLOT_BASE_URL = `http://${IP_ADDRESS}:8080/api/email`;

class EmailService {

    sendMessage(body) {
        return axios.post(`${RESERVESLOT_BASE_URL}/send`, body, {
            headers: authHeader(),
        });
    }
}

export default new EmailService();