import React, { Component } from 'react';
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
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
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		this.setState({ newUser: 'test' });
		this.setState({ isLoading: false });
	}

	handleConfirmationSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
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