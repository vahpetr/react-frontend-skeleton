import * as React from "react";
import { AppSpinnerIconComponent } from "src/components/app/icons/spinner";
import { AppStatusType } from "src/constants/app";
import { AppState } from "src/contracts/app";

export interface AppDescriptionRowState<VIEW> {
    state: AppState<VIEW>;
}

export class AppDescriptionRowComponent<VIEW> extends React.Component<
    AppDescriptionRowState<VIEW>
> {
    public getLevel = (state: AppState<VIEW>): string => {
        switch (state.status) {
            case AppStatusType.INITIAL:
            case AppStatusType.LOADING:
                return "secondary";
            case AppStatusType.TIMEOUT:
            case AppStatusType.REJECTED:
                return "warning";
            case AppStatusType.SUCCESS:
                return "success";
            case AppStatusType.INVALID:
            case AppStatusType.SERVER_ERROR:
            case AppStatusType.CLIENT_ERROR:
            default:
                return "danger";
        }
    };

    public render(): JSX.Element | null {
        const { state } = this.props;
        switch (state.status) {
            case AppStatusType.INITIAL: {
                return (
                    <div className="row">
                        <div className="col">Data not loaded.</div>
                    </div>
                );
            }
            case AppStatusType.LOADING: {
                return (
                    <div className="row">
                        <div className="col">
                            <AppSpinnerIconComponent />
                        </div>
                    </div>
                );
            }
            case AppStatusType.INVALID:
            case AppStatusType.SERVER_ERROR:
            case AppStatusType.CLIENT_ERROR:
            case AppStatusType.TIMEOUT:
            case AppStatusType.REJECTED: {
                const className = `alert alert-${this.getLevel(state)}`;
                return (
                    <div className="row">
                        <div className="col">
                            <div className={className} role="alert">
                                <pre>
                                    {JSON.stringify(state.error, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                );
            }
            default: {
                return null;
            }
        }
    }
}
