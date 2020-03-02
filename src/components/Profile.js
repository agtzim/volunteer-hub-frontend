import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { UserContext } from '../context/UserContext'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import Event from '../components/Event'
import {URL} from '../constants'
import './Profile.css'

const Tab = ({ user, tab }) => {
	switch (tab) {
		case 1: return (
			<>
				<h6>My email is</h6>
				<h3>{user.email}</h3>
			</>
		)
		case 3: return (
			<>
				<h6>I live in</h6>
				<h3>{user.country}</h3>
			</>
		)
		default: return (
			<>
				<h6>Hi, my name is</h6>
				<h3>{user.firstName} {user.lastName}</h3>
			</>
		)
	}
}

const Profile = () => {
	const [user, setUser] = useContext(UserContext)
	const [tab, setTab] = useState('upcoming')
	const [upcoming, setUpcoming] = useState([])
	const [completed, setCompleted] = useState([])
	const size = "2x"

	const handleUpcomingClick = () => {
		setTab('upcoming')
	}

	const handleCompletedClick = () => {
		setTab('completed')
	}

	useEffect(() => {
		console.log('User is logged in so i will get his info')

		fetch(URL + '/users/current', {
			headers: {
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		})
			.then(res => res.json())
			.then(data => setUser({ ...user, user: data }))
	}, [])

	useEffect(() => {
		fetch(URL + '/events/upcoming', {
			headers: {
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		})
			.then(res => res.json())
			.then(data => setUpcoming(data))
	}, [])

	useEffect(() => {
		fetch(URL + '/events/completed', {
			headers: {
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		})
			.then(res => res.json())
			.then(data => setCompleted(data))
	}, [])

	return (
		<div>
			<Card className="mx-5 mt-5 shadow text-center">
				<Card.Header>
					<Image className="shadow p-1" src="https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg" roundedCircle />
				</Card.Header>
				<Card.Body>
					<Tab user={user.user} tab={tab} />
					<div className="d-flex justify-content-around mx-5 mt-5 icons">
						<FontAwesomeIcon id="icon-1" className="icon" icon={faUser} size={size} onClick={() => setTab(0)} />
						<FontAwesomeIcon className="icon" icon={faEnvelope} size={size} onClick={() => setTab(1)} />
						<FontAwesomeIcon className="icon" icon={faMapMarked} size={size} onClick={() => setTab(3)} />
					</div>
				</Card.Body>
			</Card>

			<Card className="mx-5 my-5 shadow">
				<Card.Header>
					<Nav variant="tabs" defaultActiveKey="#upcoming">
						<Nav.Item>
							<Nav.Link href="#upcoming" onClick={handleUpcomingClick} >Upcoming</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="#completed" onClick={handleCompletedClick} >Completed</Nav.Link>
						</Nav.Item>
					</Nav>
				</Card.Header>
				<Card.Body className="mx-auto">
					{tab === 'upcoming' ? (
						upcoming.map(event => <Event key={event.eventId} title={event.title} body={event.body} location={event.location} date={event.date} />)
					) : (
							completed.map(event => <Event key={event.eventId} title={event.title} body={event.body} location={event.location} date={event.date} />)
						)}
				</Card.Body>
			</Card>
		</div>
	)
}

export default Profile
