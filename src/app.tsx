import * as React from "react";
import { hot } from "react-hot-loader";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { AppFooterComponent } from "src/components/app/footer";
import { AppHeaderComponent } from "src/components/app/header";
import { AppDispatch } from "src/contracts/app";
import { AppRootState, AppState, hasFlag } from "src/modules/app";
import { AppVisualStateType } from "./constants/app";

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-redux/examples/AuthExample.js

export type AppProps = AppState & AppDispatch;

export class AppComponent extends React.Component<AppProps, AppState> {
    public render(): JSX.Element {
        return (
            <div className={this.buildAppClassName()}>
                <AppHeaderComponent />
                {this.props.children}
                <AppFooterComponent />
            </div>
        );
    }

    public buildAppClassName(): string {
        const { asideMenu, header, sidebar } = this.props;
        const classNames = ["app"];

        if (hasFlag(header, AppVisualStateType.FIXED)) {
            classNames.push("header-fixed");
        }

        if (hasFlag(header, AppVisualStateType.HIDDEN)) {
            classNames.push("header-hidden");
        }

        if (hasFlag(sidebar, AppVisualStateType.FIXED)) {
            classNames.push("sidebar-fixed");
        }

        if (hasFlag(sidebar, AppVisualStateType.HIDDEN)) {
            classNames.push("sidebar-hidden");
        }

        if (hasFlag(asideMenu, AppVisualStateType.FIXED)) {
            classNames.push("aside-menu-fixed");
        }

        if (hasFlag(asideMenu, AppVisualStateType.HIDDEN)) {
            classNames.push("aside-menu-hidden");
        }

        return classNames.join(" ");
    }
}

export const mapStateToProps = (state: AppRootState): AppState => state.app;

export const mapDispatchToProps = (
    dispatch: Dispatch<Action>
): AppDispatch => ({
    dispatch
});

export const ConnectedApp = connect<AppState, AppDispatch>(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export const HotConnectedApp = hot(module)(ConnectedApp);
