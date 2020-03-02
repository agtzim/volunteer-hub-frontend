import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Event from './Event'
import Cookies from 'js-cookie'
import {URL} from '../constants'

const Events = () => {
	const user = useContext(UserContext)[0]
	const [events, setEvents] = useState([])

	useEffect(() => {
		let url = '';
		let headers = {}

		if (user.isLoggedIn) {
			url = '/available'
			headers = {
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		}
		else {
			url = '/all'
		}

		fetch(URL + '/events' + url, {
			headers
		})
			.then(res => res.json())
			.then(data => setEvents(data))
	}, [user.isLoggedIn])

	return (
		<div className="container">
			<h1 className="ml-5 my-3">Available events</h1>
			{events.map(event => <Event key={event.eventId} id={event.eventId} loggedIn={user.isLoggedIn} title={event.title} body={event.body} location={event.location} date={event.date} />)}
		</div>
	)
}

export default Events
