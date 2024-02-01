import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { WEEK_DAYS } from "../data/hours";
import dayjs from "dayjs";
import "./CustomCalendar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomCalendar = ({ displayDate, setDisplayDate }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  // const [displayDate, setDisplayDate] = useState(dayjs());

  const changeDate = (amount) => {
    let newDate = dayjs(currentDate).add(amount, "day");
    setCurrentDate(newDate);
  };

  const setToday = () => {
    setDisplayDate(dayjs());
    setCurrentDate(dayjs());
  };

  const renderDateHeaders = () => {
    const headers = [];
    let date = currentDate;

    for (let i = 0; i < 7; i++) {
      let tempDate = date.add(i, "day");
      headers.push(
        <div
          key={i}
          // className="date-header"
          className={` ${
            displayDate.date() === tempDate.date()
              ? "date-header-clicked"
              : "date-header"
          }`}
          onClick={() => setDisplayDate(tempDate)}
        >
          <span className="date-number">{tempDate.format("DD")}</span>
          <span className="day">{tempDate.format("ddd")}</span>
        </div>
      );
    }
    return headers;
  };

  return (
    <>
      <div className="date-dispaly">
        <span className="currentDate">
          {displayDate.format("DD MMMM YYYY")}
        </span>
        <span className="today" onClick={() => setToday(dayjs())}>
          Today
        </span>
      </div>
      <div className="date-navigation">
        <LeftOutlined className="left" onClick={() => changeDate(-1)} />
        <div className="date-headers">{renderDateHeaders()}</div>
        <RightOutlined className="right" onClick={() => changeDate(1)} />
      </div>
    </>
  );
};

export default CustomCalendar;
