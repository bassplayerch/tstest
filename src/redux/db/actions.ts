import { createSlice, PayloadAction } from 'redux-starter-kit';
import { FirebaseError, database } from 'firebase';
import { StateObservable } from 'redux-observable';
import { Todo } from '../../models/todo';

export type Collection = 'todos' | 'users'
export type CollectionItem = {
	collection: Collection,
	data: any;
}

export type DbState = {
	data: Map<Collection, any>,
	loading: boolean;
	error: FirebaseError | null;
};

export const auth = createSlice({
	slice: 'todos',
	initialState: { data: new Map<Collection, any>(), error: null, loading: false } as DbState,
	reducers: {
		addItemRequest: (state, action: PayloadAction<CollectionItem>) => ({
			...state,
			loading: true
		}),
		addItemSuccess: (state, action: PayloadAction<CollectionItem>) => {
			state.error = null;
			state.loading = false;
			state.data.set(action.payload.collection, action.payload.data)
			return state;
		},
		addItemFailure: (state, action: PayloadAction<firebase.FirebaseError>) => ({
			...state,
			error: action.payload,
			loading: false
		})
	}
});
