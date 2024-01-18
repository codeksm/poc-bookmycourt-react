import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import { Carousel, Calendar, Popover } from "antd";
import "./Badminton.css";
import dayjs from "dayjs";
import { Tabs, DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Badminton = () => {
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const tabData = [1, 2, 3, 4, 5];

  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in badminton");
  });

  const onClick = () => {
    //setSelectedCard(card);
    navigate("/playground");
  };

  const setToday = () => {
    //setSelectedCard(card);
    setSelectedDate(dayjs());
    setVisible(false);
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
    console.log("Date " + value);
    setVisible(false);
  };

  const content = (
    <Calendar
      className="calendar"
      value={selectedDate}
      fullscreen={false}
      onChange={handleDateClick}
    />
  );

  return (
    <>
      <div className="carousel-container">
        <Carousel autoplay>
          <div className="carousel-item">
            {" "}
            {/* Customize the styles for each carousel item */}
            <img src="https://placekitten.com/800/400" alt="Carousel 1" />
          </div>
          <div className="carousel-item">
            <img src="https://placekitten.com/800/401" alt="Carousel 2" />
          </div>
          <div className="carousel-item">
            <img src="https://placekitten.com/800/402" alt="Carousel 3" />
          </div>
        </Carousel>
      </div>

      <div className="badminton">
        <div className="badminton-courts">
          <div className="badminton-courts-tab-header">
            <Popover
              content={content}
              title={
                selectedDate ? selectedDate.format("MMMM YYYY") : "Select Date"
              }
              trigger="click"
              open={visible}
              onOpenChange={setVisible}
            >
              <span className="date-month" onClick={() => setVisible(!visible)}>
                {selectedDate
                  ? selectedDate.format("DD MMMM YYYY")
                  : "Select Date"}
              </span>
              <span className="date-today" onClick={() => setToday()}>
                Today
              </span>
            </Popover>
          </div>
          <Tabs defaultActiveKey="1" centered>
            {tabData.map((tab, index) => (
              <TabPane tab={`Court ${index + 1}`} key={index + 1}>
                <Scheduler
                  selectedKeys={selectedSlots}
                  setSelectedKeys={setSelectedSlots}
                ></Scheduler>
              </TabPane>
            ))}
          </Tabs>
        </div>

        <BookingPanel selectedKeys={selectedSlots}></BookingPanel>

        <Button onClick={onClick}>Go back</Button>
      </div>
    </>
  );
};

export default Badminton;
