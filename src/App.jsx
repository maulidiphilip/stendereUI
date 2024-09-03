import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/Room/addRoom"
import ExistingRoom from "./components/Room/ExistingRoom"

function App() {

  return (
    <>
      <AddRoom/>
      <ExistingRoom/>
    </>
  )
}

export default App
