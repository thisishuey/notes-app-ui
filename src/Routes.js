import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default () =>
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/signup" component={Signup} />
		<Route path="/login" component={Login} />
		<Route component={NotFound} />
	</Switch>;
