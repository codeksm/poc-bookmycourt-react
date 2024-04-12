import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const OrdersAreaChart = ({ orders }) => {
    // Count the number of orders for each created date
    const countOrdersByDate = () => {
        const counts = {};
        orders.forEach(order => {
            counts[order.scheduledDate] = (counts[order.scheduledDate] || 0) + 1;
        });
        return counts;
    };

    // Prepare data in the format required by Recharts
    const cumulativeData = Object.entries(countOrdersByDate()).map(([date, count]) => {
        return { date, count };
    });

    // Calculate cumulative count
    let cumulativeCount = 0;
    const dataForChart = cumulativeData.map(({ date, count }) => {
        cumulativeCount += count;
        return { date, cumulativeCount };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cumulativeCount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default OrdersAreaChart;
