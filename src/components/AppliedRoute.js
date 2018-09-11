import React from 'react';
import { Route } from 'react-router';

export default ({ component: Component, props: childProps, ...rest }) =>
	<Route {...rest} render={(props) => <Component {...props} {...childProps} />} />