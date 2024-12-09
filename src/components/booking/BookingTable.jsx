import { parseISO } from "date-fns";
import { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBooknigs = (startDate, endDate) => {
    let filtered = bookingInfo;

    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        try {
          // Validate and parse dates
          const bookingStartDate = booking?.checkInDate
            ? parseISO(booking.checkInDate)
            : null;
          const bookingEndDate = booking?.getCheckOutDate
            ? parseISO(booking.getCheckOutDate)
            : null;

          // Skip invalid or missing dates
          if (
            !bookingStartDate ||
            !bookingEndDate ||
            isNaN(bookingStartDate) ||
            isNaN(bookingEndDate)
          ) {
            console.warn("Skipping booking with invalid dates:", booking);
            return false;
          }

          // Filter based on the provided date range
          return (
            bookingStartDate >= new Date(startDate) &&
            bookingEndDate <= new Date(endDate) &&
            bookingEndDate > new Date(startDate)
          );
        } catch (error) {
          console.error("Invalid date encountered:", error, booking);
          return false;
        }
      });
    }

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    // console.log("Booking Info:", bookingInfo);
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBooknigs}
        onFilterChange={filterBooknigs}
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
