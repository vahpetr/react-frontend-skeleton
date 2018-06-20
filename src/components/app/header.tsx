import * as React from "react";
import { Link } from "react-router-dom";
import { AppLogoComponent } from "src/components/app/logo";

export interface NavigationItem {
    title: string;
    urn: string;
}

export class AppHeaderComponent extends React.Component {
    private navItems: NavigationItem[] = [
        {
            title: "Home",
            urn: "/"
        }
    ];

    public render(): JSX.Element {
        return (
            <header className="app-header navbar">
                <AppLogoComponent />
                <ul className="navbar-nav">{this.buidlList()}</ul>
                <ul className="ml-auto navbar-nav" />
            </header>
        );
    }

    private buidlList(): JSX.Element[] {
        return this.navItems.map(navItem => (
            <li className="px-3 nav-item" key={navItem.urn}>
                <Link to={navItem.urn} className="nav-link">
                    {navItem.title}
                </Link>
            </li>
        ));
    }
}
