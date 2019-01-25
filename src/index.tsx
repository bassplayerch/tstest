import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { rootEpic, user, UserState } from './redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from 'redux-starter-kit';
import { combineReducers } from 'redux';

export type State = {
	user: UserState;
};
const epicMiddleware = createEpicMiddleware();

export const reducer = combineReducers({
	user: user.reducer,
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
