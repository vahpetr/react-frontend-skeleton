import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Action } from "redux";
// tslint:disable-next-line:no-commented-code
// import { appShowSidebarAction } from "src/actions/app";
import { githubCommitActivityFetchInitAction } from "src/actions/github";
import { GithubCommitActivityChartComponent } from "src/components/github/charts/commit-activity";
import { HomeSidebarComponent } from "src/components/home/sidebar";
import { AppDispatch } from "src/contracts/app";
import { GithubCommitActivity, GithubState } from "src/contracts/github";
import { HomeFilter } from "src/contracts/home";
import { AppRootState } from "src/modules/app";

export interface HomeState {
    homeFilter: HomeFilter;
    githubCommitActivity: GithubState<GithubCommitActivity>;
}

export type HomeProps = HomeState & AppDispatch;

export class HomeComponent extends React.Component<HomeProps, HomeState> {
    public componentDidMount(): void {
        const { dispatch, homeFilter } = this.props;

        dispatch(githubCommitActivityFetchInitAction(homeFilter.githubFilter));
        // tslint:disable-next-line:no-commented-code
        // dispatch(appShowSidebarAction());
    }

    public render(): JSX.Element {
        const { githubCommitActivity, homeFilter, dispatch } = this.props;
        return (
            <div className="app-body">
                <HomeSidebarComponent />
                <main className="main">
                    <ol className="breadcrumb">
                        <li className="active breadcrumb-item">
                            <Link to={"/"}>Home</Link>
                        </li>
                    </ol>
                    <div className="container-fluid">
                        <div className="animated fadeIn">
                            <div className="row">
                                <div className="col">
                                    <GithubCommitActivityChartComponent
                                        dispatch={dispatch}
                                        filter={homeFilter.githubFilter}
                                        commitActivity={githubCommitActivity}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export const mapStateToProps = (state: AppRootState): HomeState => state.home;

export const mapDispatchToProps = (
    dispatch: Dispatch<Action>
): AppDispatch => ({
    dispatch
});

export const ConnectedHome = hot(module)(
    connect<HomeState, AppDispatch, HomeProps>(
        mapStateToProps,
        mapDispatchToProps
    )(HomeComponent)
);
