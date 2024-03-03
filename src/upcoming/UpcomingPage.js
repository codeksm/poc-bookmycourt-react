import { Tabs } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../components/CustomCalendar";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import '../components/CustomCalendar.css'
import OrdersScheduler from "./OrdersScheduler";
import PlaygroundService from "../service/PlaygroundService";
import BookingOrderService from "../service/BookingOrderService";
import './UpcomingPage.css'
import DisplayOrder from "./DisplayOrder";

const { TabPane } = Tabs;

const UpcomingEvents = () => {

  const [selectedCourt, setSelectedCourt] = useState([]);
  const [currentCourt, setCurrentCourt] = useState("1");
  const [courts, setCourts] = useState(["1", "2", "3"]);
  const [orders, setOrders] = useState([]);
  const [userSelectedOrder, setUserSelectedOrder] = useState({});
  const [date, setDisplayDate] = useState(dayjs());

  useEffect(() => {
    // Update the document title using the browser API
    console.log("selected order. " + userSelectedOrder);

  }, [userSelectedOrder]);

  useEffect(() => {
    console.log("I am in badminton");
    const fetchDataSequentially = async () => {
      await PlaygroundService.getCourts("65d429328f69db0675dba1d3", "Badminton")
        .then((response) => {
          setCourts(response.data);
          setCurrentCourt(response.data[0])
          setSelectedCourt([response.data[0]]);
          console.log("Courts ", response.data);

          BookingOrderService.getOrdersFor("65d429328f69db0675dba1d3", date.format('YYYY-MM-DD'))
            .then((response) => {
              setOrders(response.data.content);
              console.log("Orders size  ", response.data.content.length);
            })
            .catch((error) => {
              console.log("Error . ", error);
            });
        })
        .catch((error) => {
          console.log("Error . ", error);
        });
    }
    fetchDataSequentially();
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in up coming orders");
    setUserSelectedOrder({});
    BookingOrderService.getOrdersFor("65d429328f69db0675dba1d3", date.format('YYYY-MM-DD'))
      .then((response) => {
        setOrders(response.data.content);
        console.log("Orders size  ", response.data.content.length);
        console.log("Orders   ", response.data.content);
      })
      .catch((error) => {
        console.log("Error . ", error);
      });
  }, [date]);

  const onCourtChange = (key) => {
    setCurrentCourt(key);
    setUserSelectedOrder({});
    console.log(key);
  };

  return (
    <>
      <div className="upcomingpage">
        <div className="upcomingpage-courts">
          <div className="upcomingpage-courts-tab-header">
            <CustomCalendar
              displayDate={date}
              setDisplayDate={setDisplayDate}
            />
          </div>
          <Tabs defaultActiveKey="1" centered onChange={onCourtChange}>
            {courts.map((tab, index) => (
              <TabPane tab={`Court ${tab}`} key={tab}>
                <OrdersScheduler date={date} court={tab} orders={orders} setUserSelectedOrder={setUserSelectedOrder}> </OrdersScheduler>
              </TabPane>
            ))}
          </Tabs>
        </div>
        <div className="upcomingpage-displayorder">
          {userSelectedOrder && userSelectedOrder.id && (
            <DisplayOrder order={userSelectedOrder} />
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
