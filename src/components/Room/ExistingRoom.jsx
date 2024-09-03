import React, { useEffect, useState } from "react";
import { getAllRooms } from "../Utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
// this component is there to display rooms and it will utilize the room Paginator and room filter component
const ExistingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setfilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomTypes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [erorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  // fetch all the rooms from database
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setfilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setfilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);
   
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOFirstRoom, indexOfLastRoom);
  return (
    <>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h2>Existing rooms</h2>
          </div>
          <Col md={6} className="mb-3 mb-md-0">
            <RoomFilter data={rooms} setFilteredData={setfilteredRooms} />
          </Col>

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text=center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td>
                    <button className="">View/Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalpages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </>
  );
};

export default ExistingRoom;
