import React, { Component, useState, useRef, useEffect, Dispatch, FunctionComponent } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {   user } from './redux/store';
import { State } from '.';
import { auth } from './firebase/firebase';


type AppProps = {
	signUp: (email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	fetchUser: (user: firebase.User) => void;
}

const App: FunctionComponent<AppProps> = (props) => {
	useEffect(() => {
		const subscribe = auth.onAuthStateChanged((user) => {
			if (user){
				props.fetchUser(user);
			} else {
				console.log('no user :(')
			}
		});
		return () => subscribe();
	}, []);
	return (
		<>
		{console.log(props)}
		<button onClick={() => props.signUp("stefan@bassplayer.ch", "stefan.91")}>signup</button>
		<button onClick={() => props.signIn("stefan@bassplayer.ch", "stefan.91")}>signin</button>
		<button onClick={props.signOut}>signout</button>
		</>
	);
}

const mapStateToProps = (state: State) => ({
	user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
	signUp: (email: string, password: string) => dispatch(user.actions.createUserRequest({email, password})),
	signIn: (email: string, password: string) => dispatch(user.actions.signInRequest({email, password})),
	signOut: () => dispatch(user.actions.signoutRequest()),
	fetchUser: (u: firebase.User) => dispatch(user.actions.fetchUser(u))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
