import React from 'react';
import { Row, Col, Card } from 'antd';
import './PgDetails.css';
import MapContainer from '../map/MapContainer';
import imageSrc from '../images/googlemap.png';

const { Meta } = Card;

const PgDetails = ({ pgData }) => {
    // const { openTime, closeTime } = pgData.timings;

    return (
        <div className="details-container">
            <div className="pg-details-title" >
                <span> {pgData.name}  </span>
            </div>
            <div className="pg-details-body" >
                <div className="pg-details-map" >
                    {/* <MapContainer /> */}
                    <img className='image' src={imageSrc} alt="Image Description"></img>
                </div>
                <div className="pg-details-text" >
                    <p className='text'>Phone: {pgData.phone}</p>
                    <p className='text'>Address: {pgData.address}, {pgData.city}</p>
                    {/* <p className='text'>Timings: {pgData.timings.openTime} - {pgData.timings.closeTime}</p> */}
                    <p className='text'>Amenities: Parking, WashRoom </p>
                </div>
            </div>

        </div>
    );
};

export default PgDetails;
