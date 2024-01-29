import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "./BookingPanel.css";
import { TIME_SLOT_MAP } from "../data/hours";

const BookingPanel = ({ selectedKeys, selectedCourt }) => {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    // sort selected slot numbers
    console.log("I am in booking panel");
    if (selectedKeys != undefined) {
      setSlots(Array.from(selectedKeys).sort((a, b) => a - b));
    }
  }, [selectedKeys]);

  const onClick = () => {
    //setSelectedCard(card);
    //navigate("/playground");
  };

  return (
    <div className="bookingpanel-body">
      <fieldset>
        <legend>Sport</legend>
        <div className="bookingpanel-sport">Badminton</div>
      </fieldset>

      <fieldset>
        <legend>From</legend>
        {slots.length > 0 && (
          <div className="bookingpanel-from">{TIME_SLOT_MAP.get(slots[0])}</div>
        )}
      </fieldset>

      <fieldset>
        <legend>To</legend>
        {slots.length > 0 && (
          <div className="bookingpanel-to">
            {TIME_SLOT_MAP.get(slots[slots.length - 1])}
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend>Court</legend>
        {selectedCourt.length > 0 && (
          <div className="bookingpanel-court">{selectedCourt.join(", ")}</div>
        )}
      </fieldset>

      <fieldset>
        <legend>Date</legend>
        <div className="bookingpanel-date">12-02-2023</div>
      </fieldset>

      <fieldset>
        <legend>Total Amount</legend>
        <div className="bookingpanel-amount">400.00</div>
      </fieldset>

      <fieldset>
        <legend>Note</legend>
        <div className="bookingpanel-note"></div>
      </fieldset>

      <Button onClick={onClick}>Reserve Slot</Button>
    </div>
  );
};

export default BookingPanel;
