import React from 'react';
import { useState, useEffect } from "react";
import './DisplayOrder.css'
import { Button, Modal } from 'antd';
import BookingOrderService from '../service/BookingOrderService';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;
const DisplayOrder = ({ order }) => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        console.log("Display order");
        setFlip(!flip)

    }, [order]);

    const showDeleteConfirm = (order) => {
        confirm({
            title: 'Are you sure cancel this order ?',
            icon: <ExclamationCircleFilled />,
            content: (
                <div>
                    <div className='bookingorder-content'>Order #{order.id}</div>
                </div>
            ),
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                cancel(order)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const cancel = (order) => {
        console.log("Event Cancel. OrderId. " + order.id);

        BookingOrderService.cancel(order.id)
            .then((response) => {

                Modal.success({
                    title: 'Order Cancell Successfull !',
                    content: (
                        <div>
                            <div className='bookingorder-content'>Order #{response.data.id}</div>
                        </div>
                    ),
                });
            })
            .catch((error) => {
                console.log("Failed to cancel order. " + error)
                Modal.error({
                    title: 'Failed to Cancel Order',
                    content: (
                        <div>
                            {/* Display the error message */}
                            {error.message}
                        </div>
                    ),
                });
            });
    };

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
                <Button disabled={order.bookingStatus === 'Cancelled' ? true : false} className='cancel' onClick={() => showDeleteConfirm(order)} >Cancel Order</Button>
                <Button disabled={order.bookingStatus === 'Cancelled' ? true : false} className='extend' >Extend Order</Button>
            </div>



        </div >

    );
};

export default DisplayOrder;