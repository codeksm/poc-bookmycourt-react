import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/reset.css'
import './PaginatedCalendar.css'
import dayjs from 'dayjs';


const FiveDatePagination = ({ currentDate, setDisplayDate }) => {
    const [pageSize, setPageSize] = React.useState(5);
    const [displayLocal, setDisplayDateLocal] = useState(dayjs());
    const [selectedPage, setSelectedPage] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPageSize(2); // Set pageSize to 1 for mobile screens
            } else {
                setPageSize(1); // Set default pageSize for larger screens
            }
        };

        handleResize(); // Call initially
        window.addEventListener('resize', handleResize); // Add event listener for window resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
    }, []);

    const onPageChange = (page) => {
        console.log(page);
        setSelectedPage(page)
        setDisplayDate(dayjs(nextFiveDays[page - 1]))
        setDisplayDateLocal(dayjs(nextFiveDays[page - 1]))
    };


    // Create an array to store the next 5 dayjs objects
    const nextFiveDays = [];

    // Iterate over the next 5 days and push dayjs objects to the array
    for (let i = 0; i < 7; i++) {
        nextFiveDays.push(currentDate.add(i, 'day'));
    }

    const customItemRender = (current, type, originalElement) => {
        const isSelected = current === selectedPage;
        const className = isSelected ? 'selected' : '';

        if (type === 'page') {
            // return <span style={{ width: '50px', height: '50px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '5px', marginRight: '5px' }}>{contentStrings[current - 1]}</span>;
            return (<div className={`pg-date-container${className}`} onClick={() => setSelectedPage(current)}>
                <span className={`pg-date${className}`}>{nextFiveDays[current - 1].format("DD")} { }</span>
                <span className={`pg-day${className}`}>{nextFiveDays[current - 1].format("ddd")}</span>
            </div>)

        }
        return originalElement;

    }

    return (
        <>
            <div className="date-dispaly">
                <span className="currentDate">
                    {displayLocal.format("DD MMMM YYYY")}
                </span>
                <span className="today" onClick={() => { }}>
                    Today
                </span>
            </div>
            <div className='pagination-date'>
                <Pagination
                    defaultCurrent={1}
                    total={7}
                    pageSize={pageSize} // Set pageSize to 1 to display one item per page
                    itemRender={customItemRender}
                    onChange={onPageChange}
                    responsive
                />
            </div>
        </>

    );

};




export default FiveDatePagination;
