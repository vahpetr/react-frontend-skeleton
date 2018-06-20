import * as React from "react";
import { hot } from "react-hot-loader";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { AppFooterComponent } from "src/components/app/footer";
import { AppHeaderComponent } from "src/components/app/header";
import { AppDispatch } from "src/contracts/app";
import { AppRootState, AppState } from "src/modules/app";
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

        if (this.hasFlag(header, AppVisualStateType.FIXED)) {
            classNames.push("header-fixed");
        }

        if (this.hasFlag(header, AppVisualStateType.HIDDEN)) {
            classNames.push("header-hidden");
        }

        if (this.hasFlag(sidebar, AppVisualStateType.FIXED)) {
            classNames.push("sidebar-fixed");
        }

        if (this.hasFlag(sidebar, AppVisualStateType.HIDDEN)) {
            classNames.push("sidebar-hidden");
        }

        if (this.hasFlag(asideMenu, AppVisualStateType.FIXED)) {
            classNames.push("aside-menu-fixed");
        }

        if (this.hasFlag(asideMenu, AppVisualStateType.HIDDEN)) {
            classNames.push("aside-menu-hidden");
        }

        return classNames.join(" ");
    }

    public hasFlag(value: number, flag: number): boolean {
        return (value & flag) === flag;
    }
}

export const mapStateToProps = (state: AppRootState): AppState => state.app;

export const mapDispatchToProps = (
    dispatch: Dispatch<Action>
): AppDispatch => ({
    dispatch
});

export const ConnectedApp = hot(module)(
    connect<AppState, AppDispatch>(
        mapStateToProps,
        mapDispatchToProps
    )(AppComponent)
);
