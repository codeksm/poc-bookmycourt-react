import axios from "axios";
import authHeader from "./AuthHeader";

const BOOKSLOT_BASE_URL = "http://192.168.249.221:8080/api/book";

class BookSlotService {

    getSlots(pgId, sport, court, date) {
        return axios.get(`${BOOKSLOT_BASE_URL}/pg/${pgId}/sports/${sport}/courts/${court}/bookings/${date}`, {
            headers: authHeader(),
        });
    }
}

export default new BookSlotService();