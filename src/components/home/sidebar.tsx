import * as React from "react";
import { Link } from "react-router-dom";
import { AppHomeIconComponent } from "src/components/app/icons/home";

export class HomeSidebarComponent extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active">
                                <AppHomeIconComponent/> Home
                                <span className="badge badge-info">NEW</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
