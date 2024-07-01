import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from "./ipaddress";

const BOOKSLOT_BASE_URL = `http://${IP_ADDRESS}:8080/api/book`;

class BookSlotService {

    getSlots(pgId, sport, court, date) {
        return axios.get(`${BOOKSLOT_BASE_URL}/pg/${pgId}/sports/${sport}/courts/${court}/bookings/${date}`, {
            headers: authHeader(),
        });
    }
}

export default new BookSlotService();