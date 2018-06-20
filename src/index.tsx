import "src/styles/site.scss";

// https://github.com/matthew-andrews/isomorphic-fetch

import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { App } from "src/app";
import { appInitialRootState, appRootReducer } from "src/modules/app";
import registerServiceWorker from "src/registerServiceWorker";
import { appRootSaga } from "src/sagas/app";

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const routeMiddleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    appRootReducer,
    appInitialRootState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware, routeMiddleware, createLogger)
    )
);

sagaMiddleware.run(appRootSaga);

// http://stackoverflow.com/q/43057911/340760
// const history = syncHistoryWithStore(createBrowserHistory() as any, store);

render(
    <Provider store={store} key="provider">
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
