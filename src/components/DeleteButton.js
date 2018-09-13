import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { API } from 'aws-amplify';
import LoaderButton from './LoaderButton';

class DeleteButton extends Component {
	state = {
		isDeleting: false
	};

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
		const { isDeleting } = this.state;
		return (
			<LoaderButton
				block
				bsSize="large"
				bsStyle="danger"
				isLoading={isDeleting}
				loadingText="Deleting..."
				onClick={this.handleDelete}
				text="Delete"
			/>
		);
	}
}

DeleteButton.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.string.isRequired
};

export default withRouter(DeleteButton);
