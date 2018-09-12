import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { s3Upload } from '../libs/aws';
import config from '../config';
import './Note.css';

export default class Note extends Component {
	file = null;
	state = {
		attachmentURL: null,
		content: '',
		isDeleting: null,
		isLoading: null,
		note: null
	};

	async componentDidMount () {
		try {
			let attachmentURL;
			const note = await this.getNote();
			const { attachment, content } = note;
			if (attachment) {
				attachmentURL = await Storage.vault.get(attachment);
			}
			this.setState({ note, content, attachmentURL });
		} catch (exception) {
			alert(exception.message);
		}
	}

	getNote () {
		const { match } = this.props;
		return API.get('notes', `/notes/${match.params.id}`);
	}

	validateForm () {
		const { content } = this.state;
		return content.length > 0;
	}

	formatFilename (filename) {
		return filename.replace(/^\w+-/, '');
	}

	handleChange = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	handleFileChange = (event) => {
		this.file = event.target.files[0];
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { history } = this.props;
		const { content, note } = this.state;
		const { MAX_ATTACHMENT_SIZE } = config;
		let attachment;
		if (this.file && this.file.size > MAX_ATTACHMENT_SIZE) {
			alert(`Please pick a file smaller than ${MAX_ATTACHMENT_SIZE/1000000} MB`);
			return;
		}
		this.setState({ isLoading: true });
		try {
			if (this.file) {
				attachment = await s3Upload(this.file);
			}
			await this.updateNote({
				attachment: attachment || note.attachment,
				content
			});
			history.push('/');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isLoading: false });
		}
	}

	updateNote (body) {
		const { match } = this.props;
		return API.put('notes', `/notes/${match.params.id}`, { body });
	}

	handleDelete = async (event) => {
		event.preventDefault();
		const { history } = this.props;
		const confirmed = window.confirm('Are you sure you want to delete this note?');
		if (!confirmed) {
			return;
		}
		this.setState({ isDeleting: true });
		try {
			await this.deleteNote();
			history.push('/');
		} catch (exception) {
			alert(exception.message);
			this.setState({ isDeleting: false });
		}
	}

	deleteNote () {
		const { match } = this.props;
		return API.del('notes', `/notes/${match.params.id}`);
	}

	render () {
		const { attachmentURL, content, isDeleting, isLoading, note } = this.state;
		return (
			<div className="Note">
				{note && 
					<form onSubmit={this.handleSubmit}>
						<FormGroup controlId="content">
							<FormControl
								componentClass="textarea"
								onChange={this.handleChange}
								value={content}
							/>
						</FormGroup>
						<FormGroup controlId="file">
							<ControlLabel>Attachment</ControlLabel>
							{note.attachment &&
								<FormControl.Static>
									<a href={attachmentURL} target="_blank" rel="noopener noreferrer">
										{this.formatFilename(note.attachment)}
									</a>
								</FormControl.Static>
							}
							<FormControl onChange={this.handleFileChange} type="file" />
						</FormGroup>
						<LoaderButton
							block
							bsSize="large"
							bsStyle="primary"
							disabled={!this.validateForm()}
							isLoading={isLoading}
							loadingText="Saving..."
							text="Save"
							type="submit"
						/>
						<LoaderButton
							block
							bsSize="large"
							bsStyle="danger"
							isLoading={isDeleting}
							loadingText="Deleting..."
							onClick={this.handleDelete}
							text="Delete"
						/>
					</form>
				}
			</div>
		);
	}
}

Note.propTypes = {
	match: PropTypes.object.isRequired
};
