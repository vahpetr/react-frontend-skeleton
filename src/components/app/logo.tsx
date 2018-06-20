import * as React from "react";
import { Link } from "react-router-dom";

export class AppLogoComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <Link to={"/"} className="app-logo">
                <span className="app-logo-mini">
                    <b>F</b>S
                </span>
                <span className="app-logo-lg">
                    <b>Frontend</b>
                    Skeleton
                </span>
            </Link>
        );
    }
}
