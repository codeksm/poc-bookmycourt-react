import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "./BookingPanel.css";

const BookingPanel = ({ selectedKeys }) => {
  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in booking panel");
  });

  const onClick = () => {
    //setSelectedCard(card);
    //navigate("/playground");
  };

  return (
    <div className="bookingpanel-body">
      <fieldset>
        <legend>From</legend>
        <div className="bookingpanel-from">10:30 AM</div>
      </fieldset>

      <fieldset>
        <legend>To</legend>
        <div className="bookingpanel-to">12:00 PM</div>
      </fieldset>

      <fieldset>
        <legend>Court</legend>
        <div className="bookingpanel-court">Court 1</div>
      </fieldset>

      <fieldset>
        <legend>Date</legend>
        <div className="bookingpanel-date">12-02-2023</div>
      </fieldset>

      <fieldset>
        <legend>Sport</legend>
        <div className="bookingpanel-sport">Badminton</div>
      </fieldset>

      <Button onClick={onClick}>Reserve Slot</Button>
    </div>
  );
};

export default BookingPanel;
