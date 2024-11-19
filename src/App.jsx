import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/Room/addRoom"
import ExistingRoom from "./components/Room/ExistingRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import EditRoom from "./components/Room/EditRoom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/Room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"

function App() {

  return (
    <>
    <main>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
          <Route path="/existing-rooms" element={<ExistingRoom/>}/>
          <Route path="/add-room" element={<AddRoom/>}/>
          <Route path="/book-room/:roomId" element={<Checkout/>}/>
          <Route path="/browse-all-rooms" element={<RoomListing/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </Router>
      <Footer/>
    </main>
    </>
  )
}

export default App
