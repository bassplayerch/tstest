import { createSlice, PayloadAction, configureStore, Action, createAction, createReducer } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware, ActionsObservable, ofType, Epic, StateObservable } from 'redux-observable';
import { pipe } from 'rxjs';
import { filter, mapTo, delay, switchMap } from 'rxjs/operators';
import { auth, db } from '../firebase/firebase';
import { FirebaseError } from 'firebase';
import { State } from '..';

export type UserState = {
    error: firebase.FirebaseError | null;
    user: firebase.User | null;
    loading: boolean;
};

const signupEpic: Epic = (action$) =>
    action$.pipe(
        ofType(user.actions.createUserRequest),
        switchMap((action: ReturnType<typeof user.actions.createUserRequest>) =>
            auth
                .createUserWithEmailAndPassword(action.payload.email, action.payload.password)
                .then((fbUser) => createAction(user.actions.createUserSuccess.toString())(fbUser.user))
                .catch((error: FirebaseError) =>
                    createAction<FirebaseError>(user.actions.createUserFailure.toString())(error)
                )
        )
    );

const signoutEpic: Epic = (action$) =>
    action$.pipe(
        ofType(user.actions.signoutRequest),
        switchMap((action: ReturnType<typeof user.actions.signoutRequest>) =>
            auth
                .signOut()
                .then(() => createAction(user.actions.signoutSucces.toString())())
                .catch((error: FirebaseError) =>
                    createAction<FirebaseError>(user.actions.signoutFailure.toString())(error)
                )
        )
    );

const signinEpic: Epic = (action$) =>
    action$.pipe(
        ofType(user.actions.signInRequest),
        switchMap((action: ReturnType<typeof user.actions.signInRequest>) =>
            auth
                .signInWithEmailAndPassword(action.payload.email, action.payload.password)
                .then((fbUser) => createAction(user.actions.signInSuccess.toString())(fbUser.user))
                .catch((error: FirebaseError) =>
                    createAction<FirebaseError>(user.actions.signInFailure.toString())(error)
                )
        )
    );

const addUserToDbEpic: Epic = (action$) =>
    action$.pipe(
        ofType(user.actions.addUserToDbRequest),
        switchMap((action: ReturnType<typeof user.actions.addUserToDbRequest>) =>
            db
                .collection('users')
                .doc(action.payload.id)
                .set({ email: action.payload.email })
                .then(() => createAction(user.actions.addUserToDbSuccess.toString())())
                .catch((error: FirebaseError) =>
                    createAction<FirebaseError>(user.actions.addUserToDbFailure.toString())(error)
                )
        )
    );

export const user = createSlice({
    slice: 'user',
    initialState: { error: null, loading: false } as UserState,
    reducers: {
        createUserRequest: (state, action: PayloadAction<{ email: string; password: string }>) => ({
            ...state,
            loading: true
        }),
        createUserSuccess: (state, action: PayloadAction<firebase.User>) => ({
            ...state,
            user: action.payload,
            loading: false,
            error: null
        }),
        createUserFailure: (state, action: PayloadAction<firebase.FirebaseError>) => ({
            ...state,
            error: action.payload,
            loading: false
        }),
        signInRequest: (state, action: PayloadAction<{ email: string; password: string }>) => ({
            ...state,
            loading: true
        }),
        signInSuccess: (state, action: PayloadAction<firebase.User>) => ({
            ...state,
            user: action.payload,
            loading: false,
            error: null
        }),
        signInFailure: (state, action: PayloadAction<firebase.FirebaseError>) => ({
            ...state,
            error: action.payload,
            loading: false
        }),
        fetchUser: (state, action: PayloadAction<firebase.User>) => ({ ...state, user: action.payload }),
        signoutRequest: (state) => ({
            ...state,
            loading: true
        }),
        signoutSucces: (state) => ({ ...state, loading: false, user: null }),
        signoutFailure: (state, action: PayloadAction<FirebaseError>) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
        addUserToDbRequest: (state, action: PayloadAction<{ email: string; id: string }>) => ({
            ...state,
            loading: true
        }),
        addUserToDbSuccess: (state) => ({ ...state, loading: false }),
        addUserToDbFailure: (state, action: PayloadAction<FirebaseError>) => ({
            ...state,
            loading: false,
            error: action.payload
        })
    }
});

export const rootEpic = combineEpics(signupEpic, signinEpic, signoutEpic, addUserToDbEpic);
