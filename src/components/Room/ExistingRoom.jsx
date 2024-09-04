import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../Utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage(`Room No. ${roomId} successifully removed`);
        fetchRooms();
      } else {
        console.error(`Error deleting rooms : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
  };

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
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="gap-3">
                    <Link to={`/edit-room/${room.id}`}>
                      <span className="btn btn-info btn-sm">
                        <FaEye/>
                      </span>
                      <span className="btn btn-warning btn-sm">
                        <FaEdit/>
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FaTrashAlt/>
                    </button>
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
