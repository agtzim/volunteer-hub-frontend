import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import volunteer_1 from '../static/volunteer_1.jpg'
import volunteer_2 from '../static/volunteer_2.jpg'
import volunteer_3 from '../static/volunteer_3.jpeg'
import './Home.css'

const Home = () => {
	return (
		<div>
			<Carousel>
				<Carousel.Item className="item">
					<img className="img-responsive fit-image" src={volunteer_1} alt="volunteer event" />
				</Carousel.Item>
				<Carousel.Item className="item">
					<img className="img-responsive fit-image" src={volunteer_2} alt="volunteer event" />
				</Carousel.Item>
				<Carousel.Item className="item">
					<img className="img-responsive fit-image" src={volunteer_3} alt="volunteer event" />
				</Carousel.Item>
			</Carousel>
			<div className="myCaption">
				<h1>Join Us and find volunteering opportunities around the world!</h1>
				<p>Join our community and find different events around the world to volunteer in. Meet and and co-ordinate with people who are goind to the same events as you and enjoy your self through helping !!! If you are an organization, a Country or a City official register with us in order to be able to create, post or finance new volunteering events</p>
			</div>
		</div>
	)
}

export default Home
