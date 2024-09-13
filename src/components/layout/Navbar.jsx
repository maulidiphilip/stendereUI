import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"}>
                <span className='hotel-color'>MtendereInn</span>
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>Browse Rooms</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                            Admin
                        </NavLink>
					</li>
                </ul>

                <ul className='d-flex navbar-nav'>
                    <li className='nav-item '>
                        <NavLink className="nav-link" to={"/find-booking"}>
							Find my booking
						</NavLink>
                    </li>

                    <li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>

                                        <Link className="dropdown-item" to={"/profile"}>
											Profile
										</Link>

                                        <Link className="dropdown-item" to={"/logout"}>
											Logout
										</Link>
									</li>
							</ul>
						</li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar