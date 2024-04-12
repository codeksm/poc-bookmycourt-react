import React, { useState, useEffect } from "react";
import { Carousel, Card } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./pgDashboard.css"
import PlaygroundService from "../service/PlaygroundService";
import PgDetails from "./PgDetails";

const { Meta } = Card;

const PgDashboard = () => {
  const [playGroundDto, setPlayGroundDto] = useState({});
  const navigate = useNavigate();

  const contentStyle = {
    width: '100%', // Ensure the image fills the full width of its parent container
    height: '100%', // Maintain aspect ratio by setting height to 100%
    objectFit: 'cover',
  };

  useEffect(() => {
    PlaygroundService.getPgById("65d429328f69db0675dba1d3")
      .then((response) => {
        setPlayGroundDto(response.data);
      })
      .catch((error) => {
        console.log("Error . ", error);
      });
  }, []);

  const renderBackgroundImage = (sport) => {
    switch (sport) {
      case 'Badminton':
        return require('../images/badminton.jpg'); // Adjust the path as needed
      case 'Football':
        return require('../images/footBall.jpg'); // Adjust the path as needed
      default:
        return ''; // Default or no image
    }
  };


  const handleBadmintonClick = (card) => {
    //setSelectedCard(card);
    navigate("/badminton");
  };

  const handleFootballClick = (card) => {
    //setSelectedCard(card);
    navigate("/football");
  };

  const handleSportClick = (sport) => {
    switch (sport) {
      case 'Badminton':
        handleBadmintonClick();
        break;
      case 'Football':
        handleFootballClick();
        break;
      // Add cases for other sports if needed
      default:
        break;
    }
  };

  return (
    <div>

      <div className="carousel-container">

        <Carousel className="carousel" effect="fade">
          <div className="carousel1">
            <img style={contentStyle} src="https://picsum.photos/800/300/?random" alt="1" />
          </div>
          <div className="carousel2">
            <img style={contentStyle} src="https://picsum.photos/800/301/?random" alt="2" />
          </div>
          <div className="carousel3">
            <img style={contentStyle} src="https://picsum.photos/800/302/?random" alt="3" />
          </div>
          <div className="carousel4">
            <img style={contentStyle} src="https://picsum.photos/800/303/?random" alt="4" />
          </div>
        </Carousel>
      </div>

      <div className="pgdashboard-container">
        <div className="pgdashboard-sports">
          {playGroundDto && playGroundDto.sportInfo && playGroundDto.sportInfo.map((sportData) => (
            <Card
              key={sportData.sport}
              className="sport-card"
              hoverable
              style={{
                width: 240,
                backgroundImage: `url(${renderBackgroundImage(sportData.sport)})`,
              }}
              onClick={() => handleSportClick(sportData.sport)}
            >
              <Meta
                title={sportData.sport}
                description={`Click to select ${sportData.sport}`}
              />
            </Card>
          ))}
        </div>
        <div className="pgdashboard-details">
          <PgDetails pgData={playGroundDto}></PgDetails>
        </div>

      </div>
    </div>
  );
};

export default PgDashboard;
