import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'
import {URL} from '../constants'
import './Event.css'

const Event = props => {
	const [applied, setApplied] = useState(false)

	const handleApply = () => {
		fetch(`${URL}/events/${props.id}`, {
			headers: {
				Authorization: 'Bearer ' + Cookies.get('jwt')
			}
		})
			.then(res => setApplied(true))
			.catch(err => console.log(err))
	}


	return (
		<div>
			<Card className="mx-5 mb-3">
				{/* <Card.Header>Featured</Card.Header> */}
				<Card.Body>
					<Card.Title>{props.title}</Card.Title>
					<Card.Text>
						{props.body}
					</Card.Text>
					<div className="bot">
						{props.loggedIn && !applied && <Button variant="primary" onClick={handleApply}>Apply</Button>}
						{applied && <em>Applied</em>}
						<p><em className="mr-2">{props.date}</em> <strong>{props.location}</strong></p>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Event
