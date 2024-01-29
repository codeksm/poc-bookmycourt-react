import React, { useState } from "react";
import { Select, Checkbox, Row, Col } from "antd";
import "antd/dist/reset.css";
import "./CourtSelection.css"; // Import the CSS file for styling

const courts = ["court1", "court2", "court3"];

const CourtSelection = ({ setSelectedCourt }) => {
  const options = [];
  for (let i = 10; i < 26; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleCourtChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedCourt(value);
  };

  return (
    <div className="courts-selection-container">
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="Please select"
        defaultValue={["a10", "c12"]}
        onChange={handleCourtChange}
        options={options}
      />
    </div>
  );
};

export default CourtSelection;
