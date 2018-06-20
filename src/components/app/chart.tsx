import * as highcharts from "highcharts/highstock";
import * as React from "react";

export interface AppChartState {
    options: AppChartView;
}

export type AppChartView = highcharts.Options & {
    availableTypes: AppChartViewType[];
    type: AppChartViewType;
};

export enum AppChartViewType {
    STOCK = "Stock",
    PLAIN = "Plain",
    INVERTED = "Inverted",
    POLAR = "Polar"
}

export const chartViews: { [key in AppChartViewType]: AppChartView } = {
    [AppChartViewType.STOCK]: {
        availableTypes: [],
        type: AppChartViewType.STOCK
    },
    [AppChartViewType.PLAIN]: {
        availableTypes: [AppChartViewType.PLAIN, AppChartViewType.INVERTED],
        chart: {
            inverted: false,
            polar: false
        },
        subtitle: {
            text: "Plain"
        },
        type: AppChartViewType.PLAIN
    },
    [AppChartViewType.INVERTED]: {
        availableTypes: [AppChartViewType.PLAIN, AppChartViewType.INVERTED],
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: "Inverted"
        },
        type: AppChartViewType.INVERTED
    },
    [AppChartViewType.POLAR]: {
        availableTypes: [],
        chart: {
            inverted: false,
            polar: true
        },
        subtitle: {
            text: "Polar"
        },
        type: AppChartViewType.POLAR
    }
};

export class AppChartComponent extends React.Component<
    AppChartState,
    AppChartState
> {
    private element: HTMLDivElement | null = null;
    private chart: highcharts.ChartObject | null = null;
    private resizeTimeoutId?: number;

    constructor(props: AppChartState) {
        super(props);

        this.state = props;
    }

    public componentDidMount(): void {
        if (!this.element) {
            return;
        }

        this.createChart(this.element, this.state.options);
        this.onResize();
    }

    public componentWillUnmount(): void {
        this.disposeChart();
    }

    public disposeChart(): void {
        window.removeEventListener("resize", this.onResize);

        if (!this.chart) {
            return;
        }

        this.chart.destroy();
        this.chart = null;
    }

    public subscribe(): void {
        window.addEventListener("resize", this.onResize);
    }

    public componentWillReceiveProps(nextProps: AppChartState): void {
        if (this.chart) {
            this.chart.update(nextProps.options, true);
        } else if (this.element) {
            this.createChart(this.element, nextProps.options);
        }
        this.onResize();
    }

    public createChart(element: HTMLDivElement, options: AppChartView): void {
        this.disposeChart();

        if (options.type === AppChartViewType.STOCK) {
            this.chart = highcharts.stockChart(element, options);
        } else {
            this.chart = highcharts.chart(element, options);
        }

        this.subscribe();
    }

    public render(): JSX.Element | null {
        if (!this.state.options) {
            return null;
        }

        return (
            <div>
                <div ref={ref => (this.element = ref)} className="app-chart" />
                {this.hasOptions(this.state.options.type) ? (
                    <div className="row justify-content-end">
                        <div className="col col-sm-4">
                            <div className="form-group">
                                <label htmlFor="view">View</label>
                                <select
                                    id="view"
                                    defaultValue={this.state.options.type}
                                    onChange={this.onChangeView}
                                    className="form-control"
                                >
                                    {this.buildOptions(this.state.options.type)}
                                </select>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }

    private onResize = () => {
        if (!this.chart) {
            return;
        }

        if (this.resizeTimeoutId) {
            clearTimeout(this.resizeTimeoutId);
        }

        this.resizeTimeoutId = window.setTimeout(() => {
            if (!this.chart) {
                return;
            }
            this.chart.reflow();
        }, 200);
    };

    private onChangeView = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        if (!this.chart) {
            return;
        }

        const newState = {
            ...this.state,
            options: {
                ...this.state.options,
                ...chartViews[ev.target.value]
            }
        };
        this.setState(newState);
        this.chart.update(newState.options, true);
        this.onResize();
    };

    private hasOptions(type: AppChartViewType): boolean {
        if (!chartViews[type].availableTypes.length) {
            return false;
        }

        return true;
    }

    private buildOptions(type: AppChartViewType): JSX.Element[] | null {
        if (!this.hasOptions(type)) {
            return null;
        }

        return chartViews[type].availableTypes.map(availableType => {
            return (
                <option value={availableType} key={availableType}>
                    {availableType}
                </option>
            );
        });
    }
}
