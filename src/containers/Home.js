import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {

	render () {
		return (
			<div className="Home">
				<h1>Scratch</h1>
				<p>A simple note taking app</p>
				<div>
					<Link to="/login" className="btn btn-info btn-lg">
						Login
					</Link>
					<Link to="/signup" className="btn btn-success btn-lg">
						Signup
					</Link>
				</div>
			</div>
		);
	}
}

export default Home;
