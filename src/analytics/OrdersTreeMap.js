import React, { useEffect, useState } from 'react';
import { Treemap, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const OrdersTreeMap = ({ orders }) => {
    // Calculate the count of orders for each booking type and booking status combination
    const countOrders = () => {
        const counts = {};
        orders.forEach(order => {
            const key = `${order.bookingType}-${order.bookingStatus}`;
            counts[key] = (counts[key] || 0) + 1;
        });
        return counts;
    };

    // Prepare data in the format required by Recharts
    const dataForChart = Object.entries(countOrders()).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <Treemap
                width={400}
                height={200}
                data={dataForChart}
                dataKey="value"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
            />
        </ResponsiveContainer>
    );
};

export default OrdersTreeMap;
