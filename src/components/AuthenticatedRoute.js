import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, props: childProps, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				childProps.isAuthenticated
					? <Component {...props} {...childProps} />
					: <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
			}
		/>
	);
};

export default AuthenticatedRoute;
