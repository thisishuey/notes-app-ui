import React from 'react';
import { Route } from 'react-router';

const AppliedRoute = ({ component: Component, props: childProps, ...rest }) => {
	return <Route {...rest} render={(props) => <Component {...props} {...childProps} />} />;
};

export default AppliedRoute;
