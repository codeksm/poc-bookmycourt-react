import { Button, message, Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import Scheduler from "./Scheduler";
import BookingPanel from "./BookingPanel";
import "./Badminton.css";
import dayjs from "dayjs";
import { Tabs, Carousel } from "antd";
import { v4 as uuidv4 } from "uuid";
import CourtSelection from "./CourtSelection";
import PlaygroundService from "../service/PlaygroundService";
import BookSlotService from "../service/BookSlotService";
import { LeftOutlined } from "@ant-design/icons";
import FiveDatePagination from "../invoice/PaginatedCalendar";

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
  const [refresh, setRefresh] = useState(false);
  const pgId = '65d429328f69db0675dba1d3';
  const sport = 'Badminton'

  const contentStyle = {
    width: '100%', // Ensure the image fills the full width of its parent container
    height: '100%', // Maintain aspect ratio by setting height to 100%
    objectFit: 'cover',
  };


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

          BookSlotService.getSlots(pgId, sport, response.data[0], displayDate.format('YYYY-MM-DD'))
            .then((response) => {
              setBookedSlots(response.data.bSlots);
              setReservedSlots(response.data.rSlots)
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
    setSelectedSlots(new Set());
    BookSlotService.getSlots(pgId, sport, currentCourt, displayDate.format('YYYY-MM-DD'))
      .then((response) => {
        setBookedSlots(response.data.bSlots);
        setReservedSlots(response.data.rSlots)
      })
      .catch((error) => {
        console.log("Error . ", error);
        messageApi.open({
          type: 'error',
          content: 'Failed to load',
        });
      });
  }, [refresh, displayDate, currentCourt]);

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

  const handleBreadcrumbClick = (title) => {
    if (title === 'Aditya Sports Arena') {
      navigate('/playground');
    }
  };

  return (
    <>
      {contextHolder}
      {/* <Button className="backbutton" onClick={onClick}>
        <LeftOutlined />
      </Button> */}
      <div className="breadcrumb">
        <Breadcrumb
          items={[
            {
              title: 'Aditya Sports Arena',
              onClick: () => handleBreadcrumbClick('Aditya Sports Arena'),
            },
            {
              title: 'Badminton',
            },
          ]}
        />
      </div>
      <div className="carousel-container">

        <Carousel className="carousel" effect="fade">
          <div className="carousel1">
            {/* <h3 style={contentStyle}>1</h3> */}
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

      <div className="badminton">
        <div className="badminton-courts">
          <div className="badminton-courts-tab-header">
            {/* <CustomCalendar
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
            /> */}
            <FiveDatePagination currentDate={dayjs()} setDisplayDate={setDisplayDate} />
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
            refresh={refresh}
            setRefresh={setRefresh}
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
