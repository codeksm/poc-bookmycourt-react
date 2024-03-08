import axios from "axios";
import authHeader from "./AuthHeader";



const ORDERS_BASE_URL = "http://localhost:8080/api/orders";

class BookingOrderService {

  getOrdersFor(pgId, date) {

    return axios.get(`${ORDERS_BASE_URL}/pg`, {
      params: {
        pgId: '65d429328f69db0675dba1d3',
        bookingType: 'Reserved',
        startDate: date,
        size: 15,
        page: 1,
      },
      headers: authHeader(),
    });
  }

  cancel(ordeId) {
    return axios.post(`${ORDERS_BASE_URL}/cancel/${ordeId}`, {}, {
      headers: authHeader(),
    });
  }
}

export default new BookingOrderService();