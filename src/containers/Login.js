import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

export default class Login extends Component {
	state = {
		email: '',
		password: ''
	};	

	validateForm () {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handlSubmit = (event) => {
		event.preventDefault();
	}

	render () {
		return (
			<div className="Login">
				<form onSubmit={this.handlSubmit}>
					<FormGroup bsSize="large" controlId="email">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus
							onChange={this.handleChange}
							type="email"
							value={this.state.email}
						/>
					</FormGroup>
					<FormGroup bsSize="large" controlId="password">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							onChange={this.handleChange}
							type="password"
							value={this.state.password}
						/>
					</FormGroup>
					<Button block bsSize="large" disabled={!this.validateForm()} type="submit">
						Login
					</Button>
				</form>
			</div>
		);
	}
}