import React from 'react';
import { useState, useEffect } from "react";
import './DisplayOrder.css'
import { Button, Modal, Select } from 'antd';
import BookingOrderService from '../service/BookingOrderService';
import { ExclamationCircleFilled, DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

const { confirm } = Modal;
const DisplayOrder = ({ order }) => {
    const [flip, setFlip] = useState(false);
    const [extendDuration, setExtendDuration] = useState(30);

    useEffect(() => {
        // Update the document title using the browser API
        console.log("Display order");
        setFlip(!flip)

    }, [order]);

    const handleExtendDurationChange = (value) => {
        console.log(`selected ${value}`);
        setExtendDuration(value)
    };

    const showExtendConfirm = (order) => {
        confirm({
            title: 'Are you sure extend this order ?',
            icon: <ExclamationCircleFilled />,
            content: (
                <div className='extend-content'>
                    {/* <div className='bookingorder-content'>Extend Order #{order.id} by 30 min</div> */}
                    <Select
                        defaultValue={30}
                        style={{
                            width: 120,
                        }}
                        onChange={handleExtendDurationChange}
                        options={[
                            {
                                value: 30,
                                label: '30 min',
                            },
                            {
                                value: 60,
                                label: '60 min',
                            },
                        ]}
                    />
                </div>
            ),
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                extend(order)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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

    const print = (order) => {
        window.print();
    }

    const extend = (order) => {
        console.log("Extend Event. OrderId. " + order.id);
        const lastElement = order.slotIds[order.slotIds.length - 1];
        const slotElement1 = lastElement + 1;
        const slotElement2 = lastElement + 2;
        let newSlots = [slotElement1];

        if (extendDuration === 60) {
            console.log("Extend by 60 min")
            newSlots.push(slotElement2);
        }

        const extendData = {
            'orderId': order.id,
            'slotIds': newSlots,
        }

        console.log("Extend Event. Order. " + JSON.stringify(extendData));

        BookingOrderService.extend(extendData)
            .then((response) => {

                Modal.success({
                    title: 'Order Extend Successfull !',
                    content: (
                        <div>
                            <div className='bookingorder-content'>Order #{response.data.id} extended by {extendDuration} minutes</div>
                        </div>
                    ),
                });
            })
            .catch((error) => {
                console.log("Failed to extend order. " + error)
                Modal.error({
                    title: 'Failed to Extend Order',
                    content: (
                        <div>
                            {/* Display the error message */}
                            {error.message}
                        </div>
                    ),
                });
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

    const generatePDF = (order) => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.setFont('Newsreader', 'bold');
        doc.text(`Order #${order.id}`, 10, 10);
        doc.setFont('Newsreader', 'normal');
        doc.text(`${dayjs()}`, 150, 10);

        doc.setLineWidth(0.1);
        doc.setDrawColor(200, 200, 200);
        doc.line(10, 18, 200, 18);

        doc.setFont('Newsreader', 'bold')
        doc.text('Booking Status :', 30, 23)
        doc.text('Booking Type :', 30, 27)
        doc.text('Booking Category :', 30, 31)
        doc.text('Play Ground :', 30, 35)
        doc.text('Sport :', 30, 39)
        doc.text('Court :', 30, 43)
        doc.text('Start Time :', 30, 47)
        doc.text('End Time :', 30, 51)
        doc.text('Booking Date :', 30, 55)
        doc.text('Scheduled Date :', 30, 59)
        doc.text('Email :', 30, 63)
        doc.text('Phone :', 30, 67)
        doc.text('Message :', 30, 71)

        doc.setFont('Newsreader', 'normal')
        doc.text(`${order.bookingStatus}`, 80, 23);
        doc.text(`${order.bookingType}`, 80, 27)
        doc.text(`${order.category}`, 80, 31)
        doc.text(`${order.pgName}`, 80, 35)
        doc.text(`${order.sport}`, 80, 39)
        doc.text(`${order.court}`, 80, 43)
        doc.text(`${order.startTime}`, 80, 47)
        doc.text(`${order.endTime}`, 80, 51)
        // doc.text(format(new Date(`${order.createdDate}`), 'MMM dd, yyyy'), 80, 55)
        // doc.text(format(new Date(`${order.scheduledDate}`), 'MMM dd, yyyy'), 80, 59)
        doc.text(`${order.createdDate}`, 80, 55)
        doc.text(`${order.scheduledDate}`, 80, 59)
        doc.text(`${order.email}`, 80, 63)
        doc.text(`${order.phone}`, 80, 67)
        doc.text(`${order.message}`, 80, 71)

        doc.setLineWidth(0.1);
        doc.line(10, 75, 200, 75);

        doc.setFont('Newsreader', 'bold')
        doc.text('Total Amount :', 30, 80)
        doc.text('Advance Paid :', 30, 84)
        doc.text('Balance Amount :', 30, 88)

        doc.setFont('Newsreader', 'normal')
        doc.text(`${order.amount} ₹`, 80, 80)
        doc.text(`${order.advancePaid} ₹`, 80, 84)
        doc.text(`${order.balanceAmt} ₹`, 80, 88)

        doc.setLineWidth(0.1);
        doc.line(10, 93, 200, 93);

        doc.save(`Invoice_${order.id}.pdf`);
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


            <div className='booking-order-invoice'>

                <Button disabled={order.bookingStatus === 'Cancelled' ? true : false} className='invoice' onClick={() => generatePDF(order)}>
                    <DownloadOutlined /> Invoice
                </Button>
            </div>
            <div className='booking-order-actios'>
                <Button disabled={order.bookingStatus === 'Cancelled' ? true : false} className='cancel' onClick={() => showDeleteConfirm(order)} >Cancel Order</Button>
                <Button disabled={order.bookingStatus === 'Cancelled' ? true : false} className='extend' onClick={() => showExtendConfirm(order)}>Extend Order</Button>

            </div>



        </div >

    );
};

export default DisplayOrder;