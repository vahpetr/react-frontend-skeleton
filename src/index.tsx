import "src/styles/site.scss";

// https://github.com/matthew-andrews/isomorphic-fetch

import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { SwitchProps } from "react-router";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { HotConnectedApp } from "src/app";
import { AppPageChangelogComponent } from "src/components/app/page-changelog";
import { AppPageNotFoundComponent } from "src/components/app/page-not-found";
import {
    appInitialRootState,
    appRootReducer,
    AppRootState
} from "src/modules/app";
import { HotConnectedHome } from "src/modules/home/component";
// tslint:disable-next-line:no-commented-code
// import registerServiceWorker from "src/registerServiceWorker";
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

const ConnectedSwitch = connect(
    (state: AppRootState): SwitchProps => ({
        location: state.router.location || undefined
    }),
    () => ({})
)(Switch);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HotConnectedApp>
                <ConnectedSwitch>
                    <Route exact={true} path="/" component={HotConnectedHome} />
                    <Route
                        exact={true}
                        path="/changelog"
                        component={AppPageChangelogComponent}
                    />
                    <Route path="*" component={AppPageNotFoundComponent} />
                </ConnectedSwitch>
            </HotConnectedApp>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

// temporarily disable service worker, need prevent coverage and documentation handling
// tslint:disable-next-line:no-commented-code
// registerServiceWorker();
