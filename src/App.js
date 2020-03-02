import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from './context/UserContext'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import LoginForm from './components/auth/LoginForm'
import Profile from './components/Profile'
import Events from './components/Events'
import SignupForm from './components/auth/SignupForm'

function App() {
	const user = useContext(UserContext)[0]

	return (
		<Router>
			<Navigation />
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/login">
				<LoginForm />
			</Route>
			<Route path="/signup">
				<SignupForm />
			</Route>

			<Route path="/profile">
				{user.isLoggedIn ? <Profile /> : null}
			</Route>

			<Route path="/events">
				<Events />
			</Route>
		</Router>
	)
}

export default App