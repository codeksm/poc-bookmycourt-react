import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "./BookingPanel.css";
import { TIME_SLOT_MAP } from "../data/hours";

const BookingPanel = ({ displayDate, selectedKeys, selectedCourt }) => {
  const [slots, setSlots] = useState([]);
  const [isDataChanged, setDataChanged] = useState(false);
  const [isSlotChanged, setSlotChanged] = useState(false);
  const [isCourtChanged, setCourtChanged] = useState(false);

  useEffect(() => {
    // sort selected slot numbers
    console.log("I am in booking panel");
    setSlotChanged(!isSlotChanged);
    if (selectedKeys != undefined) {
      setSlots(Array.from(selectedKeys).sort((a, b) => a - b));
    }
  }, [selectedKeys]);

  useEffect(() => {
    setCourtChanged(!isCourtChanged);
    console.log("court changed!");
  }, [selectedCourt]);

  useEffect(() => {
    setDataChanged(!isDataChanged);
    console.log("court changed!");
  }, [displayDate]);

  const onClick = () => {
    //setSelectedCard(card);
    //navigate("/playground");
  };

  return (
    <div className="bookingpanel-body">
      <div className={`bookingpanel-sport`}>
        <span className="bookingpanel-left">Sport</span>
        <span className="bookingpanel-right">Badminton</span>
      </div>

      <div
        className={`bookingpanel-date ${
          isDataChanged ? "fade-out" : "fade-in"
        }`}
      >
        <span className="bookingpanel-left">Date</span>
        <span className="bookingpanel-right">
          {displayDate.format("DD-MM-YYYY")}
        </span>
      </div>

      <div
        className={`bookingpanel-court ${
          isCourtChanged ? "fade-out" : "fade-in"
        }`}
      >
        <span className="bookingpanel-left">Court</span>
        <span className="bookingpanel-right">{selectedCourt.join(", ")}</span>
      </div>

      {slots.length > 0 && (
        <div
          className={`bookingpanel-from ${
            isSlotChanged ? "fade-out" : "fade-in"
          }`}
        >
          <span className="bookingpanel-left">From</span>
          <span className="bookingpanel-right">
            {TIME_SLOT_MAP.get(slots[0])}
          </span>
        </div>
      )}

      {slots.length > 1 && (
        <div
          className={`bookingpanel-to ${
            isSlotChanged ? "fade-out" : "fade-in"
          }`}
        >
          <span className="bookingpanel-left">To</span>
          <span className="bookingpanel-right">
            {TIME_SLOT_MAP.get(slots[slots.length - 1] + 1)}
          </span>
        </div>
      )}

      {slots.length > 1 && (
        <div
          className={`bookingpanel-cost ${
            isSlotChanged ? "fade-out" : "fade-in"
          }`}
        >
          <span className="bookingpanel-left">Amount</span>
          <span className="bookingpanel-right">400.00</span>
        </div>
      )}

      {slots.length > 1 && (
        <div className="reserve-slot">
          <Button type="primary" className="reserve-slot-btn" onClick={onClick}>
            Reserve Slot
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
