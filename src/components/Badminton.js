import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import "./Badminton.css";

const Badminton = () => {
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState(new Set());

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
      <div className="badminton-body1">
        <Scheduler
          selectedKeys={selectedSlots}
          setSelectedKeys={setSelectedSlots}
        ></Scheduler>
        <BookingPanel selectedKeys={selectedSlots}></BookingPanel>
      </div>
      <Button onClick={onClick}>Go back</Button>
    </>
  );
};

export default Badminton;
