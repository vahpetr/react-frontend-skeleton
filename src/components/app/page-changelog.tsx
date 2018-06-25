import * as React from "react";
import { AppEmptySidebarComponent } from "src/components/app/empty-sidebar";

export class AppPageChangelogComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="app-body">
                <AppEmptySidebarComponent />
                <main className="main">
                    <div className="container-fluid">
                        <div className="animated fadeIn">
                            <div className="row">
                                <div className="col">
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    Changelog
                                                </h5>
                                                <ul>
                                                    <li>0.1.0 Initial</li>
                                                    <li>0.2.0 Add auto-generated documentation</li>
                                                    <li>0.3.0 Add auto-generated coverage</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
