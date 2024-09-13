import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/Room/addRoom"
import ExistingRoom from "./components/Room/ExistingRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import EditRoom from "./components/Room/EditRoom"

function App() {

  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
          <Route path="/existing-rooms" element={<ExistingRoom/>}/>
          <Route path="/add-room" element={<AddRoom/>}/>
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
