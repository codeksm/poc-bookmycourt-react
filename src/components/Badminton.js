import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import "./Badminton.css";
import dayjs from "dayjs";
import { Tabs } from "antd";
// import { Carousel } from "3d-react-carousal";
import Carousel from "react-spring-3d-carousel";
import CustomCalendar from "./CustomCalendar";
import { v4 as uuidv4 } from "uuid";

const { TabPane } = Tabs;
uuidv4();

const Badminton = () => {
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const tabData = [1, 2, 3, 4, 5];
  // const [currentDate, setCurrentDate] = useState(new Date());

  // let slides = [
  //   <img src="https://picsum.photos/800/300/?random" alt="1" />,
  //   <img src="https://picsum.photos/800/301/?random" alt="2" />,
  //   <img src="https://picsum.photos/800/302/?random" alt="3" />,
  //   <img src="https://picsum.photos/800/303/?random" alt="4" />,
  //   <img src="https://picsum.photos/800/304/?random" alt="5" />,
  // ];

  const slides = [
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/300/?random" alt="1" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/301/?random" alt="2" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/302/?random" alt="3" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/303/?random" alt="4" />,
    },
  ];

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

  const callback = function (index) {
    console.log("callback", index);
  };

  return (
    <>
      <Button className="backbutton" onClick={onClick}>
        Go back
      </Button>
      <div className="carousel-container">
        {/* <Carousel
          className="carousel-item"
          slides={slides}
          autoplay={false}
          arrows={true}
          interval={4000}
          onSlideChange={callback}
        /> */}
        <Carousel
          className="carousel-item"
          slides={slides}
          goToSlide={0}
          offsetRadius={1}
          showNavigation={true}
        />
      </div>

      <div className="badminton">
        <div className="badminton-courts">
          <div className="badminton-courts-tab-header">
            <CustomCalendar />
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
      </div>
    </>
  );
};

export default Badminton;
