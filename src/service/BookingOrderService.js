import axios from "axios";
import authHeader from "./AuthHeader";
import { IP_ADDRESS } from './ipaddress'


// const ORDERS_BASE_URL = "http://localhost:8080/api/orders";
const ORDERS_BASE_URL = `http://${IP_ADDRESS}:8080/api/orders`;

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

  getAllOrders(pgId, sport, startdate, endDate, bookingType, bookingStatus, bookingCategory, phone) {

    return axios.get(`${ORDERS_BASE_URL}/pg`, {
      params: {
        pgId: '65d429328f69db0675dba1d3',
        bookingType: bookingType,
        bookingStatus: bookingStatus,
        category: bookingCategory,
        startDate: startdate,
        endDate: endDate,
        sport: sport,
        phone: phone,
        size: 100,
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

  extend(data) {
    return axios.post(`${ORDERS_BASE_URL}/extend`, data, {
      headers: authHeader(),
    });
  }
}

export default new BookingOrderService();