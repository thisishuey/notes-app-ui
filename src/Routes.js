import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './containers/Home';
import NotFound from './containers/NotFound';

export default () =>
	<Switch>
		<Route path="/" exact component={Home} />
		<Route component={NotFound} />
	</Switch>;
