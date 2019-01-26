import React, { useEffect, FunctionComponent } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { auth as fbAuth } from './firebase/firebase';
import { Router, navigate } from '@reach/router';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import { auth } from './redux/auth/actions';
import { State } from './redux/store';
import { routes } from './constants/routes';
import ActivateEmailPage from './components/ActivateEmailPage/ActivateEmailPage';

type AppProps = {
	signOut: () => void;
	fetchUser: (user: firebase.User) => void;
};

const App: FunctionComponent<AppProps> = ({ fetchUser }) => {
	useEffect(() => {
		const subscribe = fbAuth.onAuthStateChanged((user) => {
			if (user) {
				fetchUser(user);
				if (user.emailVerified) {
					navigate(routes.HOME_PAGE);
				} else {
					navigate(routes.ACTIVATE_EMAIL_PAGE);
				}
			} else {
				navigate(routes.SIGN_UP_PAGE);
			}
		});
		return () => subscribe();
	}, []);
	return (
		<Router>
			<SignUpPage path={routes.SIGN_UP_PAGE} />
			<HomePage path={routes.HOME_PAGE} />
			<ActivateEmailPage path={routes.ACTIVATE_EMAIL_PAGE} />
		</Router>
	);
};

const mapStateToProps = (state: State) => ({
	auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
	signOut: () => dispatch(auth.actions.signoutRequest()),
	fetchUser: (u: firebase.User) => dispatch(auth.actions.fetchUser(u))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
