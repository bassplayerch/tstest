import React, { useEffect, FunctionComponent } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { State } from '.';
import { auth as fbAuth } from './firebase/firebase';
import { Router, navigate } from '@reach/router';
import { HOME_PAGE, SIGN_UP_PAGE } from './constants/constants';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import { auth } from './redux/auth/actions';

type AppProps = {
	signOut: () => void;
	fetchUser: (user: firebase.User) => void;
};

const App: FunctionComponent<AppProps> = ({ fetchUser }) => {
	useEffect(() => {
		const subscribe = fbAuth.onAuthStateChanged((user) => {
			if (user) {
				fetchUser(user);
				navigate(HOME_PAGE);
			} else {
				navigate(SIGN_UP_PAGE);
			}
		});
		return () => subscribe();
	}, []);
	return (
		<Router>
			<SignUpPage path={SIGN_UP_PAGE} />
			<HomePage path={HOME_PAGE} />
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
