import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({ orders }) => {
    // Count the number of orders for each booking status and booking category combination
    const countOrdersByStatusAndCategory = () => {
        const counts = {};
        orders.forEach(order => {
            const key = `${order.bookingStatus}-${order.bookingCategory}`;
            counts[key] = (counts[key] || 0) + 1;
        });
        return counts;
    };

    // Prepare data in the format required by Recharts
    const dataForChart = Object.entries(countOrdersByStatusAndCategory()).map(([key, count]) => {
        const [bookingStatus, bookingCategory] = key.split('-');
        return { bookingStatus, bookingCategory, count };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bookingStatus" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Default" stackId="a" fill="#8884d8" />
                <Bar dataKey="Coaching" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Tournament" stackId="a" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedBarChart;
