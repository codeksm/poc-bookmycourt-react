import React from "react";
import { useEffect, useState } from "react";
import "./Scheduler.css";
import { HOURS_MAP, TIME_SLOT_MAP } from "../data/hours";
import dayjs from "dayjs";



/*
30 min slot == 1.5 rem
60 min slot == 3 rem
1 min == 0.05 rem
*/
const Scheduler = ({ date, booked, reserved, selectedKeys, setSelectedKeys }) => {
  const timeSlots = Array.from({ length: 24 }, (_, index) => index + 1); // 24 hours
  const eventSlots = Array.from({ length: 48 }, (_, index) => index + 1); // 24 hours, 1 hour as two slots
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setFlip(!flip)
  }, [booked]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  const handleEventClick = (eventSlotKey) => {
    alert(`Clicked on event: ${eventSlotKey.username}`);
  };

  const handleAvailableEventClick = (eventSlotKey) => {

    if (dayjs(date).isSame(currentDate, "day")) {
      let time = new Date();
      let timeOffset = (time.getHours() - 1) * 3 + time.getMinutes() * 0.05;
      if ((eventSlotKey - 1) * 1.5 + 1.5 > timeOffset) {
        setSelectedKeys((prevSelectedKeys) => {
          const newSelectedKeys = new Set(prevSelectedKeys);
          if (newSelectedKeys.has(eventSlotKey)) {
            newSelectedKeys.delete(eventSlotKey);
          } else {
            newSelectedKeys.add(eventSlotKey);
          }
          return newSelectedKeys;
        });
      } else {
        alert(`Cannot select: ${eventSlotKey.username}`);
      }
    } else if (dayjs(date).isAfter(currentDate)) {
      setSelectedKeys((prevSelectedKeys) => {
        const newSelectedKeys = new Set(prevSelectedKeys);
        if (newSelectedKeys.has(eventSlotKey)) {
          newSelectedKeys.delete(eventSlotKey);
        } else {
          newSelectedKeys.add(eventSlotKey);
        }
        return newSelectedKeys;
      });
    } else {
      alert(`Cannot select: ${eventSlotKey.username}`);
    }
  };

  return (
    <div className={flip ? 'calendar-scheduler-flip' : 'calendar-scheduler'} >
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
        {Array.from(TIME_SLOT_MAP.keys()).map((eventSlotKey) => {
          if (booked.includes(eventSlotKey)) {
            return (
              <div
                key={eventSlotKey}
                className="event-slot-booked"
                style={{
                  top: `${(eventSlotKey - 1) * 1.5}rem`,
                  height: `${1 * 1.5}rem`,
                }}
                onClick={() => handleEventClick(eventSlotKey)}
              >
                Booked
              </div>
            );
          } else if (reserved.includes(eventSlotKey)) {
            return (
              <div
                key={eventSlotKey}
                className="event-slot-reserved"
                style={{
                  top: `${(eventSlotKey - 1) * 1.5}rem`,
                  height: `${1 * 1.5}rem`,
                }}
                onClick={() => handleEventClick(eventSlotKey)}
              >
                Reserved
              </div>
            );
          } else {
            return (
              <div
                key={eventSlotKey}
                className={` ${selectedKeys.has(eventSlotKey)
                  ? "event-slot-available"
                  : "event-slot-available-not-selected"
                  }`}
                style={{
                  top: `${(eventSlotKey - 1) * 1.5}rem`,
                  height: `${1 * 1.5}rem`,
                  color: selectedKeys.has(eventSlotKey) ? "white" : "",
                }}
                onClick={() => handleAvailableEventClick(eventSlotKey)}
              >
                Available
              </div>
            );
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

export default Scheduler;
