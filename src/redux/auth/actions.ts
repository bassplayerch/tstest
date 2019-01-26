import { createSlice, PayloadAction} from 'redux-starter-kit';
import { FirebaseError } from 'firebase';
import { StateObservable } from 'redux-observable';

export type AuthState = {
    error: firebase.FirebaseError | null;
    user: firebase.User | null;
    loading: boolean;
};



export const auth = createSlice({
    slice: 'auth',
    initialState: { error: null, loading: false } as AuthState,
    reducers: {
        signUpRequest: (state, action: PayloadAction<{ email: string; password: string }>) => ({
            ...state,
            loading: true
        }),
        signUpSuccess: (state, action: PayloadAction<firebase.User>) => ({
            ...state,
            user: action.payload,
            error: null
        }),
        signUpFailure: (state, action: PayloadAction<firebase.FirebaseError>) => ({
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
        signoutSucces: (state) => ({
            ...state,
            loading: false,
            user: null
        }),
        signoutFailure: (state, action: PayloadAction<FirebaseError>) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
        addUserToDbSuccess: (state,  action: PayloadAction<firebase.User>) => state,
        addUserToDbFailure: (state, action: PayloadAction<FirebaseError>) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
        sendActivationMailSuccess: state => ({...state, loading: false, error: null}),
        sendActivationMailFailure: (state, action: PayloadAction<FirebaseError>) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
    }
});
