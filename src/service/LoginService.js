import axios from "axios";
import authHeader from "./AuthHeader";


const AUTH_BASE_URL = "http://192.168.249.221:8080/api/auth";

class LoginService {

    authenticate(body) {
        return axios.post(`${AUTH_BASE_URL}/login`, body);
    }
}

export default new LoginService();