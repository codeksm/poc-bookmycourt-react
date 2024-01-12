import React, { useState } from "react";
import { Carousel, Card } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const { Meta } = Card;

const PgDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleBadmintonClick = (card) => {
    //setSelectedCard(card);
    navigate("/badminton");
  };

  const handleFootballClick = (card) => {
    //setSelectedCard(card);
    navigate("/football");
  };

  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
        <div>
          <h3>Slide 4</h3>
        </div>
      </Carousel>

      <Card
        hoverable
        style={{ width: 240 }}
        onClick={() => handleBadmintonClick("Badminton")}
      >
        <Meta title="Badminton" description="Click to select this option" />
      </Card>

      <Card
        hoverable
        style={{ width: 240 }}
        onClick={() => handleFootballClick("Football")}
      >
        <Meta title="Football" description="Click to select this option" />
      </Card>
      {/* <Outlet></Outlet> */}
    </div>
  );
};

const CardA = () => (
  <div>
    <h2>Card A Content</h2>
    <Link to="/">Go Back</Link>
  </div>
);

const CardB = () => (
  <div>
    <h2>Card B Content</h2>
    <Link to="/">Go Back</Link>
  </div>
);

export default PgDashboard;
