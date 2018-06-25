import addMore from "highcharts/highcharts-more";
import * as highstock from "highcharts/highstock";
import addExporting from "highcharts/modules/exporting";

addMore(highstock);
addExporting(highstock);

import * as React from "react";
import { hot } from "react-hot-loader";
import { githubFilterUpdateAction } from "src/actions/github";
import {
    AppChartComponent,
    AppChartView,
    AppChartViewType,
    chartViews
} from "src/components/app/chart";
import { AppDescriptionRowComponent } from "src/components/app/description-row";
import { AppHeaderRowComponent } from "src/components/app/header-row";
import { AppStatusType } from "src/constants/app";
import { AppDispatch } from "src/contracts/app";
import { GithubCommitActivity, GithubFilter } from "src/contracts/github";
import { GithubState } from "src/contracts/github";

export interface GithubCommitActivityChartState {
    filter: GithubFilter;
    commitActivity: GithubState<GithubCommitActivity>;
}

export type GithubCommitActivityChartProps = GithubCommitActivityChartState &
    AppDispatch;

export class GithubCommitActivityChartComponent extends React.Component<
    GithubCommitActivityChartProps,
    GithubCommitActivityChartState
> {
    constructor(props: GithubCommitActivityChartProps) {
        super(props);
    }

    public isSkipped(): boolean {
        if (this.props.commitActivity.status === AppStatusType.SUCCESS) {
            if (!this.props.commitActivity.view.length) {
                return true;
            }
        }
        return false;
    }

    public render(): JSX.Element {
        const options = this.buildConfig(this.props);

        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h4 className="mb-0 card-title">Commit activity</h4>
                        </div>
                    </div>
                    <AppHeaderRowComponent state={this.props.commitActivity} />
                    <div className="row">
                        <div className="col col-sm-4">
                            <div className="form-group">
                                <label htmlFor="view">Owner</label>
                                <input
                                    id="owner"
                                    type="text"
                                    defaultValue={this.props.filter.urn.owner}
                                    onBlur={this.handlerOwnerOnBlur}
                                    onKeyPress={this.handlerOnKeyPress}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col col-sm-4">
                            <div className="form-group">
                                <label htmlFor="view">Repository</label>
                                <input
                                    id="repo"
                                    type="text"
                                    defaultValue={this.props.filter.urn.repo}
                                    onBlur={this.handlerRepoOnBlur}
                                    onKeyPress={this.handlerOnKeyPress}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <AppDescriptionRowComponent
                        state={this.props.commitActivity}
                    />
                    {this.isSkipped()
                        ? this.skipMessage()
                        : this.drawChart(options)}
                </div>
            </div>
        );
    }

    public skipMessage(): JSX.Element {
        return (
            <div>
                <p>Github skip request.</p>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.handlerRefresh}
                >
                    Refresh
                </button>
            </div>
        );
    }

    public handlerRefresh = (_: React.MouseEvent<Element>): void => {
        const { dispatch, filter } = this.props;
        dispatch(githubFilterUpdateAction(filter));
    };

    public changeOwner = (newOwner: string) => {
        const { dispatch, filter } = this.props;
        const newFilter = { ...filter };

        newOwner = newOwner.trim();
        if (newFilter.urn.owner.trim() === newOwner) {
            return;
        }

        newFilter.urn.owner = newOwner;
        dispatch(githubFilterUpdateAction(newFilter));
    };

    public handlerOwnerOnBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.changeOwner(ev.target.value);
    };

    public handlerOnKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === "Enter") {
            ev.currentTarget.blur();
        }
    };

    public changeRepo = (newRepo: string) => {
        const { dispatch, filter } = this.props;
        const newFilter = { ...filter };

        newRepo = newRepo.trim();
        if (newFilter.urn.repo.trim() === newRepo) {
            return;
        }

        newFilter.urn.repo = newRepo;
        dispatch(githubFilterUpdateAction(newFilter));
    };

    public handlerRepoOnBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.changeRepo(ev.target.value);
    };

    public drawChart(highchartView: AppChartView | null): JSX.Element | null {
        if (!highchartView) {
            return null;
        }

        return (
            <div className="row">
                <div className="col">
                    <AppChartComponent options={highchartView} />
                </div>
            </div>
        );
    }

    public buildConfig(
        nextProps: GithubCommitActivityChartState
    ): AppChartView | null {
        if (nextProps.commitActivity.status !== AppStatusType.SUCCESS) {
            return null;
        }

        if (!nextProps.commitActivity.view.length) {
            return null;
        }

        const prepare = nextProps.commitActivity.view.map(p => {
            const sum = p.days.reduce((acc, v) => acc + v, 0);
            return [
                new Date(p.week * 1000).getTime(),
                p.total,
                Math.min(...p.days),
                Math.max(...p.days),
                sum / p.days.length,
                sum
            ];
        });

        const ranges = prepare.map(p => [p[0], p[2], p[3]]) as Array<
            [number, number]
        >;

        const averages = prepare.map(p => [
            p[0],
            Number(p[4].toFixed(0))
        ]) as Array<[number, number]>;

        const data = prepare.map(p => [p[0], p[1]]) as Array<[number, number]>;

        const options: highstock.Options = {
            credits: {
                enabled: false
            },
            rangeSelector: {
                buttons: [
                    // {
                    //     count: 1,
                    //     text: "1m",
                    //     type: "month"
                    // },
                    {
                        count: 3,
                        text: "3m",
                        type: "month"
                    },
                    {
                        count: 6,
                        text: "6m",
                        type: "month"
                    },
                    {
                        text: "YTD",
                        type: "ytd"
                    },
                    // {
                    //     count: 1,
                    //     text: "1y",
                    //     type: "year"
                    // },
                    {
                        text: "All",
                        type: "all"
                    }
                ],
                selected: 2
            },
            series: [
                {
                    data: ranges,
                    name: "Range commit count",
                    type: "areasplinerange",
                    yAxis: 0
                },
                {
                    data,
                    name: "Total commit count",
                    type: "column",
                    yAxis: 1
                },
                {
                    data: averages,
                    name: "Average commit count",
                    yAxis: 0,
                    zIndex: 1
                }
            ],
            title: {
                text: "Commit per week"
            },
            xAxis: {
                title: {
                    text: null
                },
                type: "datetime"
            },
            yAxis: [
                {
                    height: "60%",
                    lineWidth: 2,
                    type: "arearange"
                },
                {
                    height: "35%",
                    offset: 0,
                    top: "65%"
                }
            ]
        };

        return {
            ...options,
            ...chartViews[AppChartViewType.STOCK]
        } as AppChartView;
    }
}

export const HotGithubCommitActivityChartComponent = hot(module)(GithubCommitActivityChartComponent);
