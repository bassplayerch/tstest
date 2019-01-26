import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { signupEpic, signinEpic, signoutEpic, addUserToDbEpic, sendActivationMailEpic } from './auth/epics';
import { combineReducers } from 'redux';
import { AuthState, auth } from './auth/actions';
import { configureStore } from 'redux-starter-kit';


export const rootEpic = combineEpics(signupEpic, signinEpic, signoutEpic, addUserToDbEpic, sendActivationMailEpic);

export type State = {
	auth: AuthState;
};
const epicMiddleware = createEpicMiddleware();

export const reducer = combineReducers({
	auth: auth.reducer,
});

export const store = configureStore({ reducer, devTools: true, middleware: [ epicMiddleware ] });
epicMiddleware.run(rootEpic);