import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import BookingOrderService from '../service/BookingOrderService';
import './Analytics.css'
import OrdersBarChart from './OrdersBarChart';
import BookingCategoryChart from './BookingCategoryChart';
import SportTypeChart from './SportTypeChart';
import OrdersLineChart from './OrdersLineChart';
import StackedBarChart from './StackedBarChart';
import OrdersAreaChart from './OrdersAreaChart';
import OrdersScatterPlot from './OrdersScatterPlot';
import { Spin } from 'antd';

const Analytics = ({ }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        BookingOrderService.getAllOrders("65d429328f69db0675dba1d3", 'Badminton', null, null, null, null, null, null)
            .then((response) => {
                setLoading(false);
                setOrders(response.data.content);
            })
            .catch((error) => {
                console.log("Error . ", error);
                setLoading(false);
            });
    }, []);

    return (
        <Spin spinning={loading} size="large">
            <div className='analytics-container'>

                <Card title="Orders by Booking Status" className="chart-card">
                    <OrdersBarChart orders={orders} />
                </Card>
                <Card title="Orders by Booking Category" className="chart-card">
                    <BookingCategoryChart orders={orders} />
                </Card>
                <Card title="Orders by Sport Type" className="chart-card">
                    <SportTypeChart orders={orders} />
                </Card>
                <Card title="Orders Trends Over Time" className="chart-card">
                    <OrdersLineChart orders={orders} />
                </Card>
                <Card title="Orders by Booking Status and Category" className="chart-card">
                    <StackedBarChart orders={orders} />
                </Card>
                <Card title="Cumulative Orders Trends Over Time" className="chart-card">
                    <OrdersAreaChart orders={orders} />
                </Card>
                <Card title="Orders Scatter Plot" className="chart-card">
                    <OrdersScatterPlot orders={orders} />
                </Card>

            </div>
        </Spin>
    );
};

export default Analytics;
