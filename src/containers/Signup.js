import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';

export default class Signup extends Component {
	state = {
		isLoading: false,
		email: '',
		password: '',
		confirmPassword: '',
		confirmationCode: '',
		newUser: null
	};

	validateForm () {
		const { confirmPassword, email, password } = this.state;
		return email.length > 0 && password.length && password === confirmPassword;
	}

	validateConfirmationForm () {
		const { confirmationCode } = this.state;
		return confirmationCode.length > 0;
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { email: username, password } = this.state;
		try {
			const newUser = await Auth.signUp({ username, password });
			this.setState({ newUser });
		} catch (exception) {
			alert(exception.message);
		}

		this.setState({ isLoading: false });
	}

	handleConfirmationSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { history, userHasAuthenticated } = this.props;
		const { confirmationCode, email, password } = this.state;
		try {
			await Auth.confirmSignUp(email, confirmationCode);
			await Auth.signIn(email, password);
			userHasAuthenticated(true);
			history.push('/');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isLoading: false });
		}
	}

	renderForm () {
		const { confirmPassword, email, isLoading, password } = this.state;
		return (
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
			</form>
		);
	}

	renderConfirmationForm () {
		const { confirmationCode, isLoading } = this.state;
		return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<FormGroup bsSize="large" controlId="confirmationCode">
					<ControlLabel>Confirmation Code</ControlLabel>
					<FormControl
						autoFocus
						onChange={this.handleChange}
						type="tel"
						value={confirmationCode}
					/>
					<HelpBlock>Please check your email for the code.</HelpBlock>
				</FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateConfirmationForm()}
					isLoading={isLoading}
					loadingText="Verifying..."
					text="Verify"
					type="submit"
				/>
			</form>
		);
	}

	render () {
		const { newUser } = this.state;
		return (
			<div className="Signup">
				{newUser === null ? this.renderForm() : this.renderConfirmationForm() }
			</div>
		);
	}
}
