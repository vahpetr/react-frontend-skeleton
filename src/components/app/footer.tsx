import * as React from "react";
import { Link } from "react-router-dom";

export class AppFooterComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <footer className="app-footer">
                <strong>
                    <a href="/">Frontend skeleton</a> &copy; 2018
                </strong>
                <span className="ml-auto">
                    <b>Version</b>
                    &nbsp;
                    <Link to={"/changelog"}>0.1.0</Link>
                </span>
            </footer>
        );
    }
}
