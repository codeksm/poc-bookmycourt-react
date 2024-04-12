import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, CartesianGrid } from 'recharts';

const OrdersLineChart = ({ orders }) => {
    const countOrdersByDate = () => {
        const counts = {};
        orders.forEach(order => {
            counts[order.scheduledDate] = (counts[order.scheduledDate] || 0) + 1;
        });
        return counts;
    };

    const dataForChart = Object.entries(countOrdersByDate()).map(([date, count]) => ({
        date,
        count
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrdersLineChart;
