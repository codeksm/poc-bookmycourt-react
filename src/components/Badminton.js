import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Scheduler from "./Scheduler";

const Badminton = () => {
  const navigate = useNavigate();

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
      <Scheduler></Scheduler>
      <Button onClick={onClick}>Go back</Button>
      {/* <Outlet /> */}
    </>
  );
};

export default Badminton;
