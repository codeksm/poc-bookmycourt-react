import React from 'react';
import { useState, useEffect } from "react";
import './DisplayOrder.css'
import { Button } from 'antd';

const DisplayOrder = ({ order }) => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        console.log("Display order");
        setFlip(!flip)
    }, [order]);

    return (

        <div className={flip ? 'booking-order-container-flip' : 'booking-order-container'}>
            <div className={flip ? 'booking-order-header-flip' : 'booking-order-header'}>
                <span>Order #{order.id}</span>
            </div>
            <div className="booking-order">
                <div className="field">
                    <span className="label">Booking Status:</span>
                    <span className="value">{order.bookingStatus}</span>
                </div>
                <div className="field">
                    <span className="label">Booking Type:</span>
                    <span className="value">{order.bookingType}</span>
                </div>
                <div className="field">
                    <span className="label">Play Ground:</span>
                    <span className="value">{order.pgName}</span>
                </div>
                <div className="field">
                    <span className="label">Sport:</span>
                    <span className="value">{order.sport}</span>
                </div>
                <div className="field">
                    <span className="label">Booking Category:</span>
                    <span className="value">{order.category}</span>
                </div>
                <div className="field">
                    <span className="label">Court:</span>
                    <span className="value">{order.court}</span>
                </div>
                <div className="field">
                    <span className="label">Start Time:</span>
                    <span className="value">{order.startTime}</span>
                </div>
                <div className="field">
                    <span className="label">End Time:</span>
                    <span className="value">{order.endTime}</span>
                </div>
                <div className="field">
                    <span className="label">Booking Date:</span>
                    <span className="value">{order.createdDate}</span>
                </div>
                <div className="field">
                    <span className="label">Scheduled Date</span>
                    <span className="value">{order.scheduledDate}</span>
                </div>
                <div className="field">
                    <span className="label">Email:</span>
                    <span className="value">{order.email}</span>
                </div>
                <div className="field">
                    <span className="label">Phone:</span>
                    <span className="value">{order.phone}</span>
                </div>
                <div className="field">
                    <span className="label">Message:</span>
                    <span className="value">{order.message}</span>
                </div>
                <div className="field">
                    <span className="label">Total Amount:</span>
                    <span className="value">{order.amount} ₹</span>
                </div>
                <div className="field">
                    <span className="label">Advance Paid:</span>
                    <span className="value">{order.advancePaid} ₹</span>
                </div>
                <div className="field">
                    <span className="label">Balance Amount:</span>
                    <span className="value">{order.balanceAmt} ₹</span>
                </div>
            </div>
            <div className='booking-order-border'></div>
            <div className='booking-order-actios'>
                <Button className='cancel'>Cancel Order</Button>
                <Button className='extend' >Extend Order</Button>
            </div>
        </div >

    );
};

export default DisplayOrder;