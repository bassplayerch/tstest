import { Epic, ofType } from 'redux-observable';
import { FirebaseError } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { createAction } from 'redux-starter-kit';
import { db, auth as fbAuth } from '../../firebase/firebase';
import { auth } from './actions';

export const signupEpic: Epic = (action$) =>
	action$.pipe(
		ofType(auth.actions.signUpRequest),
		switchMap((action: ReturnType<typeof auth.actions.signUpRequest>) =>
			fbAuth
				.createUserWithEmailAndPassword(action.payload.email, action.payload.password)
				.then((fbUser) => createAction(auth.actions.signUpSuccess.toString())(fbUser.user))
				.catch((error: FirebaseError) =>
					createAction<FirebaseError>(auth.actions.signUpFailure.toString())(error)
				)
		)
	);

export const signoutEpic: Epic = (action$) =>
	action$.pipe(
		ofType(auth.actions.signoutRequest),
		switchMap((action: ReturnType<typeof auth.actions.signoutRequest>) =>
			fbAuth
				.signOut()
				.then(() => createAction(auth.actions.signoutSucces.toString())())
				.catch((error: FirebaseError) =>
					createAction<FirebaseError>(auth.actions.signoutFailure.toString())(error)
				)
		)
	);

export const signinEpic: Epic = (action$) =>
	action$.pipe(
		ofType(auth.actions.signInRequest),
		switchMap((action: ReturnType<typeof auth.actions.signInRequest>) =>
			fbAuth
				.signInWithEmailAndPassword(action.payload.email, action.payload.password)
				.then((fbUser) => createAction(auth.actions.signInSuccess.toString())(fbUser))
				.catch((error: FirebaseError) =>
					createAction<FirebaseError>(auth.actions.signInFailure.toString())(error)
				)
		)
	);

export const addUserToDbEpic: Epic = (action$) =>
	action$.pipe(
		ofType(auth.actions.signUpSuccess),
		switchMap((action: ReturnType<typeof auth.actions.signUpSuccess>) =>
			db
				.collection('users')
				.doc(action.payload.uid)
				.set({ email: action.payload.email })
				.then(() => createAction<firebase.User>(auth.actions.addUserToDbSuccess.toString())(action.payload))
				.catch((error: FirebaseError) =>
					createAction<FirebaseError>(auth.actions.addUserToDbFailure.toString())(error)
				)
		)
	);

export const sendActivationMailEpic: Epic = (action$) =>
	action$.pipe(
		ofType(auth.actions.addUserToDbSuccess),
		switchMap((action: ReturnType<typeof auth.actions.addUserToDbSuccess>) =>
			action.payload
				.sendEmailVerification()
				.then(() => createAction(auth.actions.sendActivationMailSuccess.toString())())
				.catch(() => createAction(auth.actions.sendActivationMailFailure.toString())())
		)
	);
