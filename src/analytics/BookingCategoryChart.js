import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BookingCategoryChart = ({ orders }) => {
    const countOrdersByCategory = () => {
        const counts = {};
        orders.forEach(order => {
            counts[order.category] = (counts[order.category] || 0) + 1;
        });
        return counts;
    };

    const dataForChart = Object.entries(countOrdersByCategory()).map(([status, count]) => ({
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

export default BookingCategoryChart;
