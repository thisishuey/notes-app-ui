import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './Confirm.css';

class Confirm extends Component {
	state = {
		isLoading: false,
		email: '',
		confirmationCode: ''
	};

	componentDidMount () {
		const { match } = this.props;
		this.setState({ email: match.params.email });
	}

	validateForm () {
		const { confirmationCode, email } = this.state;
		return confirmationCode.length > 0 && email.length > 0;
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({ isLoading: true });
		const { history } = this.props;
		const { confirmationCode, email } = this.state;
		try {
			await Auth.confirmSignUp(email, confirmationCode);
			history.push('/login');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isLoading: false });
		}
	}

	render () {
		const { match } = this.props;
		const { confirmationCode, email, isLoading } = this.state;
		return (
			<div className="Confirm">
				<form onSubmit={this.handleSubmit}>
					<FormGroup bsSize="large" controlId="email">
						<ControlLabel>Email</ControlLabel>
						<FormControl
							autoFocus={!match.params.email}
							onChange={this.handleChange}
							type="email"
							value={email}
						/>
					</FormGroup>
					<FormGroup bsSize="large" controlId="confirmationCode">
						<ControlLabel>Confirmation Code</ControlLabel>
						<FormControl
							autoFocus={match.params.email}
							onChange={this.handleChange}
							type="tel"
							value={confirmationCode}
						/>
						<HelpBlock>Please check your email for the code.</HelpBlock>
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						isLoading={isLoading}
						loadingText="Verifying..."
						text="Verify"
						type="submit"
					/>
				</form>
			</div>
		);
	}
}

Confirm.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default Confirm;
