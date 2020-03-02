import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { URL } from '../../constants'

const SignupForm = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [redirect, setRedirect] = useState(false)

	const handleSignup = () => {
		fetch(URL + '/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firstName, lastName, email, password })
		})
			.then(res => {
				if (res.status === 409) {
					alert('User already exists!')
				}
				else {
					alert('Login with your credentials')
					setRedirect(true)
				}
			})
	}

	const content = (
		<div className="container mt-5">
			<Form>
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>First name</Form.Label>
							<Form.Control type="text" onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="Enter your first name..." />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Form.Label>Last name</Form.Label>
							<Form.Control type="text" onChange={e => setLastName(e.target.value)} value={lastName} placeholder="Enter your last name..." />
						</Form.Group>
					</Col>
				</Row>
				<Form.Group>
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter email" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
				</Form.Group>

				<Button variant="primary" onClick={handleSignup}>
					Sign Up
				</Button>
				<LinkContainer to="/login">
					<Button className="ml-2" variant="secondary">
						Login
				</Button>
				</LinkContainer>
			</Form>
		</div>
	)

	if (redirect)
		return <Redirect to="/login" />
	else
		return content
}

export default SignupForm
