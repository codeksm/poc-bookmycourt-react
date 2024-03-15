import { Button, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import "./Badminton.css";
import dayjs from "dayjs";
import { Tabs } from "antd";
// import { Carousel } from "3d-react-carousal";
import Carousel from "react-spring-3d-carousel";
import CustomCalendar from "./CustomCalendar";
import { v4 as uuidv4 } from "uuid";
import CourtSelection from "./CourtSelection";
import PlaygroundService from "../service/PlaygroundService";
import BookSlotService from "../service/BookSlotService";

const { TabPane } = Tabs;
uuidv4();

const Badminton = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [currentCourt, setCurrentCourt] = useState("1");
  const [courts, setCourts] = useState([]);
  const [booked, setBookedSlots] = useState([]);
  const [reserved, setReservedSlots] = useState([]);
  const [displayDate, setDisplayDate] = useState(dayjs());
  const pgId = '65d429328f69db0675dba1d3';
  const sport = 'Badminton'


  const slides = [
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/300/?random" alt="1" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/301/?random" alt="2" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/302/?random" alt="3" />,
    },
    {
      key: uuidv4(),
      content: <img src="https://picsum.photos/800/303/?random" alt="4" />,
    },
  ];

  useEffect(() => {
    console.log("I am in badminton");
    const fetchDataSequentially = async () => {
      await PlaygroundService.getCourts(pgId, sport)
        .then((response) => {
          setCourts(response.data);
          setCurrentCourt(response.data[0])
          setSelectedCourt([response.data[0]]);
          console.log("Courts ", response.data);

          BookSlotService.getSlots(pgId, sport, response.data[0], displayDate.format('YYYY-MM-DD'))
            .then((response) => {
              setBookedSlots(response.data.bSlots);
              setReservedSlots(response.data.rSlots)
              console.log("Slots  ", response.data);
            })
            .catch((error) => {
              console.log("Error . ", error);
            });
        })
        .catch((error) => {
          console.log("Error . ", error);
        });
    }
    fetchDataSequentially();
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in badminton");
    setSelectedSlots(new Set());
    BookSlotService.getSlots(pgId, sport, currentCourt, displayDate.format('YYYY-MM-DD'))
      .then((response) => {
        setBookedSlots(response.data.bSlots);
        setReservedSlots(response.data.rSlots)
        console.log("Slots  ", response.data);
      })
      .catch((error) => {
        console.log("Error . ", error);
        messageApi.open({
          type: 'error',
          content: 'Failed to load',
        });
      });
  }, [displayDate, currentCourt]);

  const onClick = () => {
    //setSelectedCard(card);
    navigate("/playground");
  };

  const callback = function (index) {
    console.log("callback", index);
  };

  const onCourtChange = (key) => {
    setCurrentCourt(key);
    setSelectedCourt([key]);
    setSelectedSlots(new Set());
    console.log(key);
  };

  const fillSlots = () => {
    const sortedArray = Array.from(selectedSlots).sort();

    if (sortedArray.length === 2) {
      const startSlot = sortedArray[0];
      const endSlot = sortedArray[1];
      console.log("Range start " + startSlot + ", end " + endSlot);

      for (let slotKey = startSlot + 1; slotKey < endSlot; slotKey++) {
        if (!booked.includes(slotKey) && !reserved.includes(slotKey)) {
          setSelectedSlots((prevSlots) => new Set([...prevSlots, slotKey]));
        }
      }
    }
  };

  const clearSlots = () => {
    setSelectedSlots(new Set());
  };

  return (
    <>
      {contextHolder}
      <Button className="backbutton" onClick={onClick}>
        Go back
      </Button>
      <div className="carousel-container">
        <Carousel
          className="carousel-item"
          slides={slides}
          goToSlide={0}
          offsetRadius={1}
          showNavigation={true}
        />
      </div>

      <div className="badminton">
        <div className="badminton-courts">
          <div className="badminton-courts-tab-header">
            <CustomCalendar
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
            />
          </div>
          <div className="badminton-courts-tab">
            <Tabs defaultActiveKey="1" centered onChange={onCourtChange}>
              {courts.map((tab, index) => (
                <TabPane tab={`Court ${tab}`} key={tab}>
                  <Scheduler
                    date={displayDate}
                    booked={booked}
                    reserved={reserved}
                    selectedKeys={selectedSlots}
                    setSelectedKeys={setSelectedSlots}
                  ></Scheduler>
                </TabPane>
              ))}
            </Tabs>
          </div>

        </div>

        <div className="panel2">
          <CourtSelection
            courts={courts}
            currentCourt={currentCourt}
            setSelectedCourt={setSelectedCourt}
          />
          <div className="options-button">
            <Button
              className="options-button-fill"
              onClick={() => fillSlots(1)}
            >
              Fill Slots
            </Button>
            <Button
              className="options-button-clear"
              onClick={() => clearSlots(1)}
            >
              Clear Slots
            </Button>
          </div>
          <BookingPanel
            pgId={pgId}
            sport={sport}
            displayDate={displayDate}
            selectedKeys={selectedSlots}
            selectedCourt={selectedCourt}
          ></BookingPanel>
        </div>
      </div>
    </>
  );
};

export default Badminton;
