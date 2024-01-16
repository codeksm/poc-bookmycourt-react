import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import "./Badminton.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Badminton = () => {
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const tabData = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in badminton");
  });

  const onClick = () => {
    //setSelectedCard(card);
    navigate("/playground");
  };

  return (
    <>
      <div>Hello Badminton</div>
      <div className="badminton">
        <div className="badminton-courts">
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
