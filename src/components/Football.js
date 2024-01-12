import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Football = () => {
  const navigate = useNavigate();

  const onClick = () => {
    //setSelectedCard(card);
    navigate("/playground");
  };

  return (
    <>
      <div>Hello Badminton</div>
      <Button onClick={onClick}>Go back</Button>
    </>
  );
};

export default Football;
