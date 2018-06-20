import * as React from "react";
import { AppStatusType } from "src/constants/app";
import { AppState } from "src/contracts/app";

export interface AppHeaderRowState<VIEW> {
    state: AppState<VIEW>;
}

export class AppHeaderRowComponent<VIEW> extends React.Component<
    AppHeaderRowState<VIEW>
> {
    public getTitleText(status: AppStatusType): string {
        switch (status) {
            case AppStatusType.INITIAL: {
                return "Initial state";
            }
            case AppStatusType.LOADING: {
                return "Loading";
            }
            case AppStatusType.SERVER_ERROR: {
                return "Server side error";
            }
            case AppStatusType.CLIENT_ERROR: {
                return "Client side error";
            }
            case AppStatusType.TIMEOUT: {
                return "Request timeout";
            }
            case AppStatusType.REJECTED: {
                return "Request canceled";
            }
            case AppStatusType.SUCCESS: {
                return "Loaded";
            }
            default: {
                return "Unexpecting status";
            }
        }
    }

    public getTitle(status: AppStatusType): JSX.Element {
        return <div>{this.getTitleText(status)}</div>;
    }

    public getSubTitle(status: AppStatusType): JSX.Element | null {
        if (status === AppStatusType.LOADING) {
            return <div className="small text-muted">Please waiting...</div>;
        }

        return null;
    }

    public getHeader(status: AppStatusType): JSX.Element {
        return (
            <div className="col">
                {this.getTitle(status)}
                {this.getSubTitle(status)}
            </div>
        );
    }

    public render(): JSX.Element {
        const { state } = this.props;
        return <div className="row">{this.getHeader(state.status)}</div>;
    }
}
