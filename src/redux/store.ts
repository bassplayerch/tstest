import { combineEpics } from 'redux-observable';
import { signupEpic, signinEpic, signoutEpic, addUserToDbEpic } from './auth/epics';


export const rootEpic = combineEpics(signupEpic, signinEpic, signoutEpic, addUserToDbEpic);
