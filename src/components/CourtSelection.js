import React, { useState } from "react";
import { Select, Checkbox, Row, Col } from "antd";
import "antd/dist/reset.css";
import "./CourtSelection.css"; // Import the CSS file for styling

const CourtSelection = ({ courts, currentCourt, setSelectedCourt }) => {
  const options = [];
  for (let i = 0; i < courts.length; i++) {
    if (courts[i] !== currentCourt) {
      options.push({
        label: "Court " + courts[i],
        value: courts[i],
      });
    }
  }

  const handleCourtChange = (value) => {
    let updatedValue = [...value, currentCourt];
    console.log(`selected ${value}`);
    setSelectedCourt(updatedValue);
  };

  return (
    <div className="courts-selection-container">
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
          height: 40,
        }}
        placeholder="Add more courts ?"
        defaultValue={[]}
        onChange={handleCourtChange}
        options={options}
      />
    </div>
  );
};

export default CourtSelection;
