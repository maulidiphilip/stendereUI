import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
        <h2>Wlcome to Admin panel</h2>
        <br />

        <Link to={"/add-room"}>
            Manage Rooms
        </Link>
    </section>
  )
}

export default Admin