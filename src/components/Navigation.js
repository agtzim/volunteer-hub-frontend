import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useHistory, useLocation } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import Cookies from 'js-cookie'
import './Navigation.css'

const Navigation = () => {
	const [user, setUser] = useContext(UserContext)
	const location = useLocation()
	const history = useHistory()

	const handleLogout = () => {
		setUser({ user: {}, isLoggedIn: false })
		Cookies.remove('jwt')
		history.push('/')
	}

	const profileLink = (
		<LinkContainer to="/profile">
			<Nav.Link>Profile</Nav.Link>
		</LinkContainer>
	)

	const loginLink = (
		<LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
	)

	const logoutLink = (
		<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
	)

	return (
		<Navbar className="shadow" bg="light" expand="lg">
			<LinkContainer to="/">
				<Navbar.Brand> VolunteerHub</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{/* Profile Link */}
				<Nav className="mr-auto">
					{user.isLoggedIn && profileLink}
					<LinkContainer to="/events">
						<Nav.Link>Events</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav>
					{user.isLoggedIn ? logoutLink : location.pathname !== '/login' && location.pathname !== '/signup' && loginLink}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
