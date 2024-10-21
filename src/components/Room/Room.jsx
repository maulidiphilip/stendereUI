import React, { useState, useEffect } from "react";
import { getAllRooms } from "../Utils/ApiFunctions";
import { RoomCard } from "./RoomCard";
import { id } from "date-fns/locale";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  // a method call to display all the rooms from the databse
  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading rooms.....</div>;
  }
  if (error) {
    return <div className=" text-danger">Error : {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRoom = () => {
    const startUndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startUndex + roomsPerPage;
    return filteredData
      .slice(startUndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      <Row>{renderRoom()}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
