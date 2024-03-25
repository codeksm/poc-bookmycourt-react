import jsPDF from 'jspdf';
import dayjs from 'dayjs';

export const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont('Newsreader', 'bold');
    doc.text(`Order #${order.id}`, 10, 10);
    doc.setFont('Newsreader', 'normal');
    doc.text(`${dayjs()}`, 150, 10);

    doc.setLineWidth(0.1);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 18, 200, 18);

    doc.setFont('Newsreader', 'bold')
    doc.text('Booking Status :', 30, 23)
    doc.text('Booking Type :', 30, 27)
    doc.text('Booking Category :', 30, 31)
    doc.text('Play Ground :', 30, 35)
    doc.text('Sport :', 30, 39)
    doc.text('Court :', 30, 43)
    doc.text('Start Time :', 30, 47)
    doc.text('End Time :', 30, 51)
    doc.text('Booking Date :', 30, 55)
    doc.text('Scheduled Date :', 30, 59)
    doc.text('Email :', 30, 63)
    doc.text('Phone :', 30, 67)
    doc.text('Message :', 30, 71)

    doc.setFont('Newsreader', 'normal')
    doc.text(`${order.bookingStatus}`, 80, 23);
    doc.text(`${order.bookingType}`, 80, 27)
    doc.text(`${order.category}`, 80, 31)
    doc.text(`${order.pgName}`, 80, 35)
    doc.text(`${order.sport}`, 80, 39)
    doc.text(`${order.court}`, 80, 43)
    doc.text(`${order.startTime}`, 80, 47)
    doc.text(`${order.endTime}`, 80, 51)
    // doc.text(format(new Date(`${order.createdDate}`), 'MMM dd, yyyy'), 80, 55)
    // doc.text(format(new Date(`${order.scheduledDate}`), 'MMM dd, yyyy'), 80, 59)
    doc.text(`${order.createdDate}`, 80, 55)
    doc.text(`${order.scheduledDate}`, 80, 59)
    doc.text(`${order.email}`, 80, 63)
    doc.text(`${order.phone}`, 80, 67)
    doc.text(`${order.message}`, 80, 71)

    doc.setLineWidth(0.1);
    doc.line(10, 75, 200, 75);

    doc.setFont('Newsreader', 'bold')
    doc.text('Total Amount :', 30, 80)
    doc.text('Advance Paid :', 30, 84)
    doc.text('Balance Amount :', 30, 88)

    doc.setFont('Newsreader', 'normal')
    doc.text(`${order.amount} ₹`, 80, 80)
    doc.text(`${order.advancePaid} ₹`, 80, 84)
    doc.text(`${order.balanceAmt} ₹`, 80, 88)

    doc.setLineWidth(0.1);
    doc.line(10, 93, 200, 93);

    doc.save(`Invoice_${order.id}.pdf`);
};