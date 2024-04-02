import React from "react";
import { useEffect, useState } from "react";
import "./OrdersScheduler.css";
import { HOURS_MAP, TIME_SLOT_MAP, TIME_SLOT_TO_INDEX_MAP } from "../data/hours";


/*
30 min slot == 25 px
60 min slot == 50 px
1 min == 0.83 px
*/
const OrdersScheduler = ({ date, court, orders, setUserSelectedOrder }) => {
  const timeSlots = Array.from({ length: 24 }, (_, index) => index + 1); // 24 hours
  const eventSlots = Array.from({ length: 48 }, (_, index) => index + 1); // 24 hours, 1 hour as two slots
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    console.log("Hello from order shceduler");
    setFlip(!flip)
  }, [date]);

  useEffect(() => {
    // Update current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    return () => clearInterval(intervalId);
    console.log("Hello from shceduler");
  }, [currentTime]);

  const handleEventClick = (eventSlotKey) => {
    alert(`Clicked on event: ${eventSlotKey.username}`);
  };



  return (
    <div className={flip ? 'calendar-scheduler-flip' : 'calendar-scheduler'} >
      <div className="time-column-orders">
        {timeSlots.map((hour) => (
          <div key={hour} className="time-slot">
            {/* {HOURS_MAP.get(`${hour}:00`)} */}
            <fieldset className="timeslot-fieldset">
              <legend className="timeslot-legend">
                {HOURS_MAP.get(`${hour}:00`)}
              </legend>
            </fieldset>
          </div>
        ))}
      </div>
      <div className="events-column-orders">
        {eventSlots.map((slot) => (
          <div key={slot} className="event-slot"></div>
        ))}

        {orders.map((event, index) => {
          const topPosition = (TIME_SLOT_TO_INDEX_MAP.get(event.startTime) - 1) * 1.5;
          const height = (TIME_SLOT_TO_INDEX_MAP.get(event.endTime) - TIME_SLOT_TO_INDEX_MAP.get(event.startTime)) * 1.5;
          const style = {
            top: `${topPosition}rem`,
            height: `${height}rem`,
          };

          // setSlotElements(updatedSlotElements)
          if (event.court === court) {

            const overlappingEvents = orders.filter((e, i) => (
              e.court === court &&
              i !== index && // Exclude the current event from overlapping check
              ((TIME_SLOT_TO_INDEX_MAP.get(event.startTime) === TIME_SLOT_TO_INDEX_MAP.get(e.startTime)) ||
                (TIME_SLOT_TO_INDEX_MAP.get(event.startTime) < TIME_SLOT_TO_INDEX_MAP.get(e.startTime) &&
                  TIME_SLOT_TO_INDEX_MAP.get(event.endTime) > TIME_SLOT_TO_INDEX_MAP.get(e.startTime)) ||
                (TIME_SLOT_TO_INDEX_MAP.get(event.startTime) > TIME_SLOT_TO_INDEX_MAP.get(e.startTime) &&
                  TIME_SLOT_TO_INDEX_MAP.get(event.startTime) < TIME_SLOT_TO_INDEX_MAP.get(e.endTime)))

            ));

            if (event.bookingStatus === 'Confirmed') {

              let marginLeft = 0;
              let newWidth = 500;
              if (overlappingEvents.length > 0) {
                marginLeft = overlappingEvents.length * 200;
                newWidth = 300
              }

              const getClassName = () => {
                if (event.category === 'Coaching') {
                  return 'event-coaching';
                } else if (event.category === 'Tournament') {
                  return 'event-tournament';
                } else {
                  return 'event';
                }
              };

              return (
                <div
                  key={event.id}
                  className={getClassName()}
                  tabindex="0"
                  style={{ ...style, marginLeft: `${marginLeft}px`, width: `${newWidth}px` }}
                  onClick={() => setUserSelectedOrder(event)}
                >
                  <div style={{ display: "inline-block" }}>
                    <span style={{ fontWeight: "normal" }}> {event.id} |  {event.message} </span>
                    <br />
                    <span style={{ fontWeight: "normal" }} > {event.startTime} - {event.endTime} </span>
                  </div>
                </div>
              );
            } else if (event.bookingStatus === 'Cancelled') {

              let newWidth = 500
              if (overlappingEvents.length > 0) {
                newWidth = 200
              }

              return (
                <div
                  key={event.id}
                  className="event-cancelled"
                  tabindex="0"
                  style={{ ...style, width: `${newWidth}px` }}
                  onClick={() => setUserSelectedOrder(event)}
                >
                  <div style={{ display: "inline-block", maxWidth: "100%" }}>
                    <span style={{ fontWeight: "normal", display: "inline-block", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> {event.id} |  {event.bookingStatus} </span>
                    <br />
                    <span style={{ fontWeight: "normal", display: "inline-block", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> {event.startTime} - {event.endTime} </span>
                  </div>
                </div>
              );
            }

          }
        })}
        <div
          className="current-time-cursor"
          style={{
            top: `${(currentTime.getHours() - 1) * 3 +
              currentTime.getMinutes() * 0.05
              }rem`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default OrdersScheduler;
