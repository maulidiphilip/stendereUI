import { useEffect, useState } from "react";
import { cancelBooking, getAllBooking } from "../Utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingTable";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /// a useEffect to get all bookings from the database
  useEffect(() => {
    setTimeout(() => {
      getAllBooking()
        .then((data) => {
          // console.log("Booking Data:", data); // Logs the entire data array
          data.forEach((booking, index) =>
            console.log(`Booking ${index}:`, booking)
          ); // Logs each booking

          setBookingInfo(data); // Ensure data is set properly
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBooking();
      setBookingInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && <div className="text-danger">{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};

export default Bookings;
