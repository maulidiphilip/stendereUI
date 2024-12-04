import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className="container mt-5">
			<h2>Welcome philip to Adimin Panel</h2>
			<hr />
			<Link to={"/existing-rooms"}>Manage Rooms</Link> <br />
			<Link to={"/existing-bookings"}>Manage Bookings</Link>
		</section>
  )
}

export default Admin