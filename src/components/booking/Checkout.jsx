import React, { useState } from "react";
import BookingForm from "./BookingForm";
import { useEffect } from "react";
import { getRoomById } from "../Utils/ApiFunctions";
import { useParams } from "react-router-dom";
import {
  FaCar,
  FaParking,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";

const Checkout = () => {
  // state variables
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  // load th room info based on the id
  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div>
      {/* <BookingForm/> */}
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {/* check if the isLoading is not true */}
            {isLoading ? (
              <p>Loading room information</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt="Room photo"
                  style={{ width: "100%", height: "200px" }}
                />

                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Price per night:</th>
                      <td>MKW{roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi /> Wifi
                          </li>
                          <li>
                            <FaTv /> Netfilx Premium
                          </li>
                          <li>
                            <FaUtensils /> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt /> Mini bar refreshment
                          </li>
                          <li>
                            <FaCar /> Car Service
                          </li>
                          <li>
                            <FaParking /> Parking Space
                          </li>
                          <li>
                            <FaTshirt /> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
          <BookingForm/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
