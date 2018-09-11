import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Login.css';

export default class Login extends Component {
	state = {
		isLoading: false,
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

	handlSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { history, userHasAuthenticated } = this.props;
		const { email, password } = this.state;
		try {
			await Auth.signIn(email, password);
			userHasAuthenticated(true);
			history.push('/');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isLoading: false });
		}
	}

	render () {
		const { email, isLoading, password } = this.state;
		return (
			<div className="Login">
				<form onSubmit={this.handlSubmit}>
					<FormGroup bsSize="large" controlId="email">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus
							onChange={this.handleChange}
							type="email"
							value={email}
						/>
					</FormGroup>
					<FormGroup bsSize="large" controlId="password">
						<ControlLabel>Password</ControlLabel>
						<FormControl
							onChange={this.handleChange}
							type="password"
							value={password}
						/>
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
						isLoading={isLoading}
						text="Login"
						loadingText="Logging in..."
					/>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	userHasAuthenticated: PropTypes.func.isRequired
};
