import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { s3Upload } from '../libs/aws';
import config from '../config';
import './NewNote.css';

export default class NewNote extends Component {
	state = {
		isLoading: null,
		content: ''
	};
	file = null;

	validateForm () {
		const { content } = this.state;
		return content.length > 0;
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handleFileChange = (event) => {
		const { files } = event.target;
		this.file = files[0];
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { history } = this.props;
		const { content } = this.state;
		const { MAX_ATTACHMENT_SIZE } = config;
		if (this.file && this.file.size > MAX_ATTACHMENT_SIZE) {
			alert(`Please pick a file smaller than ${MAX_ATTACHMENT_SIZE/1000000} MB`);
			return;
		}
		this.setState({ isLoading: true });
		try {
			const attachment = this.file
				? await s3Upload(this.file)
				: null;
			await this.createNote({ attachment, content });
			history.push('/');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isLoading: false });
		}
	}

	createNote (body) {
		return API.post('notes', '/notes', { body });
	}

	render () {
		const { content, isLoading } = this.state;
		return (
			<div className="NewNote">
				<form onSubmit={this.handleSubmit}>
					<FormGroup bsSize="large" controlId="content">
						<FormControl
							componentClass="textarea"
							onChange={this.handleChange}
							value={content}
						/>
					</FormGroup>
					<FormGroup bsSize="large" controlId="file">
						<ControlLabel>Attachment</ControlLabel>
						<FormControl
							onChange={this.handleFileChange}
							type="file"
						/>
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						bsStyle="primary"
						disabled={!this.validateForm()}
						isLoading={isLoading}
						loadingText="Creating..."
						text="Create"
						type="submit"
					/>
				</form>
			</div>
		);
	}
}