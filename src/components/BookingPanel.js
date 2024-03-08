import { Button, Select, message, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "./BookingPanel.css";
import { TIME_SLOT_MAP } from "../data/hours";
import ReserveSlotService from "../service/ReserveSlotService";

const BookingPanel = ({ pgId, sport, displayDate, selectedKeys, selectedCourt }) => {
  const [messageApi, contextHolder] = message.useMessage();
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

  const onClickReserve = () => {
    let data = {
      pgIg: pgId,
      sport: sport,
      courtIds: selectedCourt,
      slotIds: slots,
      date: displayDate.format("YYYY-MM-DD"),
      userId: '',
      pgName: 'Aditya Sports Arena',
      totalAmt: '300.00',
      advancePaid: '0.00',
      balanceAmt: '300.00',
      message: 'test team',
    };

    let str = JSON.stringify(data);
    console.log("bookinginfo. " + str);

    ReserveSlotService.book(data)
      .then((response) => {
        console.log("Slot reserved. " + str);
        const bookingIds = response.data.map(item => item.id);
        Modal.success({
          title: 'Booking Success!',
          content: (
            <div>
              {bookingIds.map(id => (
                <div className='bookingorder-content' key={id}>Order #{id}</div>
              ))}
            </div>
          ),
        });
      })
      .catch((error) => {
        console.log("Failed to reserve. " + error)
        Modal.error({
          title: 'Failed to Book',
          content: (
            <div>
              {/* Display the error message */}
              {error.message}
            </div>
          ),
        });
      });
  };

  const handleBookingType = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="bookingpanel-body">
      {contextHolder}
      <div className={`bookingpanel-sport`}>
        <span className="bookingpanel-left">Sport</span>
        <span className="bookingpanel-right">Badminton</span>
      </div>

      <div
        className={`bookingpanel-date ${isDataChanged ? "fade-out" : "fade-in"
          }`}
      >
        <span className="bookingpanel-left">Date</span>
        <span className="bookingpanel-right">
          {displayDate.format("DD-MM-YYYY")}
        </span>
      </div>

      <div
        className={`bookingpanel-type ${isSlotChanged ? "fade-out" : "fade-in"
          }`}
      >
        <Select
          className="bookingtypeSelect"
          size='small'
          placeholder="Booking Type"
          style={{
            width: '100%',
          }}
          onChange={handleBookingType}
          options={[
            {
              value: 'Default',
              label: 'Default',
            },
            {
              value: 'Coaching',
              label: 'Coaching',
            },
            {
              value: 'Tournament',
              label: 'Tournament',
            },
          ]}
        />
      </div>

      <div
        className={`bookingpanel-court ${isCourtChanged ? "fade-out" : "fade-in"
          }`}
      >
        <span className="bookingpanel-left">Court</span>
        <span className="bookingpanel-right">{selectedCourt.join(", ")}</span>
      </div>

      {slots.length > 0 && (
        <div
          className={`bookingpanel-from ${isSlotChanged ? "fade-out" : "fade-in"
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
          className={`bookingpanel-to ${isSlotChanged ? "fade-out" : "fade-in"
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
          className={`bookingpanel-cost ${isSlotChanged ? "fade-out" : "fade-in"
            }`}
        >
          <span className="bookingpanel-left">Amount</span>
          <span className="bookingpanel-right">400.00</span>
        </div>
      )}

      {slots.length > 1 && (
        <div className="reserve-slot">
          <Button type="primary" className="reserve-slot-btn" onClick={onClickReserve}>
            Reserve Slot
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
