import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrdersBarChart = ({ orders }) => {
    const countOrdersByStatus = () => {
        const counts = {};
        orders.forEach(order => {
            counts[order.bookingStatus] = (counts[order.bookingStatus] || 0) + 1;
        });
        return counts;
    };

    const dataForChart = Object.entries(countOrdersByStatus()).map(([status, count]) => ({
        status,
        count
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataForChart}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrdersBarChart;
