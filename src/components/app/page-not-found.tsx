import * as React from "react";
import { AppEmptySidebarComponent } from "src/components/app/empty-sidebar";

export class AppPageNotFoundComponent extends React.Component {
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
                                            <div className="jumbotron">
                                                <h1 className="display-3">
                                                    Page not found
                                                </h1>
                                                <p className="lead">
                                                    Could not find page in web
                                                    application
                                                </p>
                                                <hr className="my-2" />
                                                <p>All roads lead here</p>
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
