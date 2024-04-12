import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const OrdersScatterPlot = ({ orders }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scheduledDate" type="category" />
                <YAxis dataKey="amount" type="number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Orders" data={orders} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default OrdersScatterPlot;
