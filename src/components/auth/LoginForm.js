import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Cookies from 'js-cookie'
import {URL} from '../../constants'

const LoginForm = () => {
	const setUser = useContext(UserContext)[1]
	const [redirect, setRedirect] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		console.log('In handleLogin')
		fetch(URL + '/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then(res => res.json())
			.then(data => {
				// Save jwt in a cookie
				Cookies.set('jwt', data.jwt)
				// Redirect
				fetch(URL + '/users/current', {
					headers: {
						Authorization: 'Bearer ' + Cookies.get('jwt')
					}
				})
					.then(res => res.json())
					.then(data => {
						setUser({ user: data, isLoggedIn: true })
						setRedirect(true)
					})
			})
	}

	const handleEmail = (e) => {
		setUsername(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	if (redirect) {
		return <Redirect to="/profile" />
	}
	else {
		return (
			<div className="container mt-5">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" onChange={handleEmail} value={username} placeholder="Enter email" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" onChange={handlePassword} value={password} placeholder="Password" />
					</Form.Group>
					<Button variant="primary" onClick={handleLogin}>
						Login
					</Button>
					<LinkContainer to="/signup">
						<Button className="ml-2" variant="secondary">
							Sign Up
						</Button>
					</LinkContainer>
				</Form>
			</div>
		)
	}
}

export default LoginForm
