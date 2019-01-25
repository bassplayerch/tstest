import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { rootEpic } from './redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import { AuthState, auth } from './redux/auth/actions';

export type State = {
	auth: AuthState;
};
const epicMiddleware = createEpicMiddleware();

export const reducer = combineReducers({
	auth: auth.reducer,
});

const store = configureStore({ reducer, devTools: true, middleware: [ epicMiddleware ] });
epicMiddleware.run(rootEpic);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
