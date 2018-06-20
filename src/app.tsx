import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { AppFooterComponent } from "src/components/app/footer";
import { AppHeaderComponent } from "src/components/app/header";
import { AppPageNotFoundComponent } from "src/components/app/page-not-found";
import { ConnectedHome } from "src/modules/home/component";

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-redux/examples/AuthExample.js

export class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
                <AppHeaderComponent />
                <Switch>
                    <Route
                        exact={true}
                        path="/"
                        component={ConnectedHome}
                    />
                    <Route path="*" component={AppPageNotFoundComponent} />
                </Switch>
                <AppFooterComponent />
            </div>
        );
    }
}
