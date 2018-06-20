import * as React from "react";
import { Link } from "react-router-dom";

export class AppFooterComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <footer className="app-footer">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <strong>
                                <a href="/">Frontend skeleton</a> &copy; 2018
                            </strong>
                        </div>
                        <div className="col">
                            <span className="ml-auto">
                                <b>Version</b>
                                &nbsp;
                                <Link to={"/changelog"}>0.1.0</Link>
                            </span>
                        </div>
                        <div className="col">
                            <span className="ml-auto">
                                <a href="/documentation">Documentation</a>
                            </span>
                        </div>
                        <div className="col">
                            <span className="ml-auto">
                                <a href="/coverage">Coverage</a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
