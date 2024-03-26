import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Input, Select, Modal, Button } from 'antd';
import BookingOrderService from '../service/BookingOrderService';
import './OrdersTable.css'
import { DownloadOutlined } from '@ant-design/icons';
import { generatePDF } from '../invoice/InvoiceGenerator';
import FiveDatePagination from '../invoice/PaginatedCalendar';
import dayjs from 'dayjs';

const { Option } = Select;

const OrdersTable = ({ }) => {
  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState({
    bookingStatus: null,
    bookingType: null,
    sportType: null,
    bookingCategory: null,
    startDate: null,
    endDate: null,
    phone: null
  });

  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am in up coming orders");

    BookingOrderService.getAllOrders("65d429328f69db0675dba1d3", 'Badminton', null, null, null, null, null, null)
      .then((response) => {
        setOrders(response.data.content);
        console.log("Orders size  ", response.data.content.length);
      })
      .catch((error) => {
        console.log("Error . ", error);
      });
  }, []);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Booking Status',
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
    },
    {
      title: 'Booking Type',
      dataIndex: 'bookingType',
      key: 'bookingType',
    },
    {
      title: 'PlayGround',
      dataIndex: 'pgName',
      key: 'pgName',
    },
    {
      title: 'Sport',
      dataIndex: 'sport',
      key: 'sport',
    },
    {
      title: 'Booking Category',
      dataIndex: 'bookingCategory',
      key: 'bookingCategory',
    },
    {
      title: 'Court',
      dataIndex: 'court',
      key: 'court',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    // Add other columns similarly for all fields
  ];

  const filteredOrders = orders.filter(order => {
    // Implement filtering logic based on selected filters
    // For example:
    // if (filters.bookingStatus && order.bookingStatus !== filters.bookingStatus) {
    //   return false;
    // }
    // if (filters.bookingType && order.bookingType !== filters.bookingType) {
    //   return false;
    // }
    // Implement filtering for other fields

    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleRowClick = (order) => {
    Modal.info({
      title: 'Order Info',
      content: (
        <>
          <div className="booking-order">
            <div className="field">
              <span className="label">Booking Status:</span>
              <span className="value">{order.bookingStatus}</span>
            </div>

            <div className="field">
              <span className="label">Court:</span>
              <span className="value">{order.court}</span>
            </div>
            <div className="field">
              <span className="label">Booking Date</span>
              <span className="value">{order.createdDate}</span>
            </div>
            <div className="field">
              <span className="label">Scheduled Date</span>
              <span className="value">{order.scheduledDate}</span>
            </div>
            <div className="field">
              <span className="label">Modified Date</span>
              <span className="value">{order.modifiedDate}</span>
            </div>

            <div className="field">
              <span className="label">Total Amount:</span>
              <span className="value">{order.amount} ₹</span>
            </div>

          </div>
          <div>
            <Button className='invoice' onClick={() => generatePDF(order)}>
              <DownloadOutlined /> Invoice
            </Button>
          </div>
        </>
      ),
      onOk() { },
    });
  };

  return (
    <div className='orders-history-container'>
      <div className='orders-history-filters' style={{ marginBottom: 16 }}>
        <Select
          style={{ width: 120, marginRight: 16 }}
          placeholder="Booking Status"
          onChange={value => handleFilterChange('bookingStatus', value)}
        >
          <Option value="Confirmed">Confirmed</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
        <Select
          style={{ width: 160, marginRight: 16 }}
          placeholder="Booking Category"
          onChange={value => handleFilterChange('bookingCategory', value)}
        >
          <Option value="Default">Default</Option>
          <Option value="Coaching">Coaching</Option>
          <Option value="Tournament">Tournament</Option>
        </Select>
        <Select
          style={{ width: 120, marginRight: 16 }}
          placeholder="Sport"
          onChange={value => handleFilterChange('sport', value)}
        >
          <Option value="Badminton">Badminton</Option>
        </Select>
        {/* Add other filters similarly */}
        <DatePicker
          style={{ marginRight: 16 }}
          onChange={(date, dateString) => handleFilterChange('startDate', date)}
        />
        {/* <RangePicker
          style={{ marginRight: 16 }}
          onChange={(dates, dateStrings) => handleFilterChange('endDate', dates[1])}
        /> */}
        <Input.Search
          style={{ width: 200, marginRight: 16 }}
          placeholder="Phone"
          onSearch={value => handleFilterChange('phone', value)}
        />
      </div>
      <div className='orders-history-data'>
        <Table size='small' columns={columns} dataSource={filteredOrders} pagination={{
          pageSize: 5 // Set the number of rows per page
        }} onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })} />
      </div>
    </div>
  );
};

export default OrdersTable;
