import axios from "axios";
import authHeader from "./AuthHeader";

const RESERVESLOT_BASE_URL = "http://192.168.1.4:8080/api/email";

class EmailService {

    sendMessage(body) {
        return axios.post(`${RESERVESLOT_BASE_URL}/send`, body, {
            headers: authHeader(),
        });
    }
}

export default new EmailService();