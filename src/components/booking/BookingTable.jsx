import { parseISO } from "date-fns";
import { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  // Ensure filteredBookings is always an array
  const [filteredBookings, setFilteredBookings] = useState([]);

  const filterBookings = (startDate, endDate) => {
    if (!Array.isArray(bookingInfo)) return;

    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(Array.isArray(bookingInfo) ? bookingInfo : []);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>Serial Booking No.</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings?.map((booking, index) => {
            if (!booking || !booking.roomResponse) return null; // Safeguard against undefined or missing data

            return (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>{booking.roomResponse?.id || "N/A"}</td>{" "}
                {/* Access roomResponse properties */}
                <td>{booking.roomResponse?.roomType || "N/A"}</td>
                <td>{booking.checkInDate || "N/A"}</td>
                <td>{booking.getCheckOutDate || "N/A"}</td>
                <td>{booking.guestFullName || "N/A"}</td>
                <td>{booking.guestEmail || "N/A"}</td>
                <td>{booking.numOfAdults || 0}</td>
                <td>{booking.numOfChildren || 0}</td>
                <td>{booking.totalNumOfGuest || 0}</td>
                <td>{booking.bookingConfirmationCode || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleBookingCancellation(booking.bookingId)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filteredBookings.length === 0 && (
        <p>No booking found for the selected dates</p>
      )}
    </section>
  );
};

export default BookingsTable;
