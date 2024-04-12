import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie } from 'recharts';

const SportTypeChart = ({ orders }) => {
    const countOrdersBySport = () => {
        const counts = {};
        orders.forEach(order => {
            counts[order.sport] = (counts[order.sport] || 0) + 1;
        });
        return counts;
    };

    const dataForChart = Object.entries(countOrdersBySport()).map(([sport, count]) => ({
        name: sport,
        value: count
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>

            <PieChart>
                <Pie dataKey="value" data={dataForChart} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SportTypeChart;
