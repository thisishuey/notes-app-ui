import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Login.css';

class Login extends Component {
	state = {
		isLoading: false,
		email: '',
		password: ''
	};

	validateForm () {
		const { email, password } = this.state;
		return email.length > 0 && password.length > 0;
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handlSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { userHasAuthenticated } = this.props;
		const { email, password } = this.state;
		try {
			await Auth.signIn(email, password);
			userHasAuthenticated(true);
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
						isLoading={isLoading}
						loadingText="Logging in..."
						text="Login"
						type="submit"
					/>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	userHasAuthenticated: PropTypes.func.isRequired
};

export default Login;
