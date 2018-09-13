import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import './Home.css';

class Home extends Component {
	state = {
		isLoading: true,
		notes: []
	}

	async componentDidMount () {
		const { isAuthenticated } = this.props;
		if (!isAuthenticated) {
			return;
		}
		try {
			const notes = await this.notes();
			this.setState({ notes });
		} catch (exception) {
			alert(exception.message);
		}
		this.setState({ isLoading: false });
	}

	notes () {
		return API.get('notes', '/notes');
	}

	renderNotesList (notes) {
		return [{}].concat(notes).map(
			(note, index) => {
				if (index !== 0) {
					const { content, created, noteId } = note;
					return (
						<ListGroupItem
							header={content.trim().split('\n')[0]}
							href={`/notes/${noteId}`}
							key={noteId}
							onClick={this.handleNoteClick}
						>
							{`Created: ${new Date(created).toLocaleString()}`}
						</ListGroupItem>
					);
				} else {
					return (
						<ListGroupItem
							href="/notes/new"
							key="new"
							onClick={this.handleNoteClick}
						>
							<h4><strong>{'\uFF0B'}</strong> Create a new note</h4>
						</ListGroupItem>
					);
				}
			}
		);
	}

	handleNoteClick = (event) => {
		event.preventDefault();
		const { history } = this.props;
		const { currentTarget } = event;
		history.push(currentTarget.getAttribute('href'));
	}

	renderLander () {
		return (
			<div className="lander">
				<h1>Scratch</h1>
				<p>A simple note taking app</p>
				<div>
					<Link to="/login" className="btn btn-info btn-lg">
						Login
					</Link>
					<Link to="/signup" className="btn btn-success btn-lg">
						Signup
					</Link>
				</div>
			</div>
		);
	}

	renderNotes () {
		const { isLoading, notes } = this.state;
		return (
			<div className="notes">
				<PageHeader>Your Notes</PageHeader>
				<ListGroup>
					{!isLoading && this.renderNotesList(notes)}
				</ListGroup>
			</div>
		);
	}

	render () {
		const { isAuthenticated } = this.props;
		return (
			<div className="Home">
				{isAuthenticated ? this.renderNotes() : this.renderLander()}
			</div>
		);
	}
}

Home.propTypes = {
	history: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

export default Home;
