import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';

class Signup extends Component {
	state = {
		isLoading: false,
		email: '',
		password: '',
		confirmPassword: '',
		confirmationCode: ''
	};

	validateForm () {
		const { confirmPassword, email, password } = this.state;
		return email.length > 0 && password.length && password === confirmPassword;
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { history } = this.props;
		const { email: username, password } = this.state;
		try {
			await Auth.signUp({ username, password });
			history.push(`/confirm/${username}`);
		} catch (exception) {
			alert(exception.message);
		}
		this.setState({ isLoading: false });
	}

	render () {
		const { confirmPassword, email, isLoading, password } = this.state;
		return (
			<div className="Signup">
				<form onSubmit={this.handleSubmit}>
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
					<FormGroup bsSize="large" controlId="confirmPassword">
						<ControlLabel>Confirm Password</ControlLabel>
						<FormControl
							onChange={this.handleChange}
							type="password"
							value={confirmPassword}
						/>
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						isLoading={isLoading}
						loadingText="Signing up..."
						text="Signup"
						type="submit"
					/>
					<FormGroup>
						<FormControl.Static>
							<Link to="/confirm">Already have a confirmation code?</Link>
						</FormControl.Static>
					</FormGroup>
				</form>
			</div>
		);
	}
}

Signup.propTypes = {
	history: PropTypes.object.isRequired,
	userHasAuthenticated: PropTypes.func.isRequired
};

export default Signup;
