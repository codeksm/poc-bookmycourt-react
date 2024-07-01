import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from "./ipaddress";


const AUTH_BASE_URL = `http://${IP_ADDRESS}:8080/api/auth`;

class LoginService {

    authenticate(body) {
        return axios.post(`${AUTH_BASE_URL}/login`, body);
    }
}

export default new LoginService();