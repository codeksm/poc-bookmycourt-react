import React from "react";
import { List, Card } from "antd";
import { useEffect, useState } from "react";
import "./Scheduler.css";
import { HOURS_MAP } from "../data/hours";

const orders = [
  {
    id: 1,
    date: "2023-01-12",
    username: "ksm",
    bookingType: "Reserved",
    sportType: "Badminton",
    courtName: "1",
    startTime: 3,
    endTime: 8,
  },
  {
    id: 2,
    date: "2023-01-12",
    username: "user2",
    bookingType: "Booked",
    sportType: "Badminton",
    courtName: "2",
    startTime: 11,
    endTime: 13,
  },
  {
    id: 3,
    date: "2023-01-12",
    username: "user3",
    bookingType: "Booked",
    sportType: "Badminton",
    courtName: "2",
    startTime: 13,
    endTime: 15,
  },
];

const Scheduler = () => {
  const timeSlots = Array.from({ length: 24 }, (_, index) => index + 1); // 24 hours
  const eventSlots = Array.from({ length: 48 }, (_, index) => index + 1); // 24 hours, 1 hour as two slots
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      console.log(`New time ${currentTime.getHours()}`);
      console.log(`min ${currentTime.getMinutes()}`);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  const handleEventClick = (event) => {
    alert(`Clicked on event: ${event.username}`);
  };

  return (
    <div className="calendar-scheduler">
      <div className="time-column">
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
      <div className="events-column">
        {eventSlots.map((slot) => (
          <div key={slot} className="event-slot"></div>
        ))}
        {orders.map((event) => (
          <div
            key={event.id}
            className="event"
            style={{
              top: `${(event.startTime - 1) * 25}px`,
              height: `${(event.endTime - event.startTime) * 25}px`,
            }}
            onClick={() => handleEventClick(event)}
          >
            {event.username} | {event.bookingType} | {event.sportType} | court{" "}
            {event.courtName}
          </div>
        ))}
        <div
          className="current-time-cursor"
          style={{
            top: `${
              (currentTime.getHours() - 1) * 50 +
              currentTime.getMinutes() * 0.83
            }px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Scheduler;
