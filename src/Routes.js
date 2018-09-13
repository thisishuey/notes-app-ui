import React from 'react';
import { Route, Switch } from 'react-router';
import { PropTypes } from 'prop-types';
import Confirm from './containers/Confirm';
import Home from './containers/Home';
import Login from './containers/Login';
import NewNote from './containers/NewNote';
import Note from './containers/Note';
import Notes from './containers/Notes';
import NotFound from './containers/NotFound';
import Signup from './containers/Signup';
import AuthenticatedRoute from './components/route/AuthenticatedRoute';
import UnauthenticatedRoute from './components/route/UnauthenticatedRoute';

const Routes = ({ childProps }) => {
	return (
		<Switch>
			<UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
			<UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
			<UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
			<UnauthenticatedRoute path="/confirm/:email?" exact component={Confirm} props={childProps} />
			<AuthenticatedRoute path="/notes" exact component={Notes} props={childProps} />
			<AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
			<AuthenticatedRoute path="/notes/:id" exact component={Note} props={childProps} />
			<Route component={NotFound} />
		</Switch>
	);
};

Routes.propTypes = {
	childProps: PropTypes.object.isRequired
};

export default Routes;
