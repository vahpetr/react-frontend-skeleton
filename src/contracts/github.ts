import { AppFetchPromise, AppState } from "src/contracts/app";

/**
 * Github api contract
 */
export interface GithubApi {
    /**
     * Get commit activity statistic by reository
     * https://developer.github.com/v3/repos/statistics/#get-the-last-year-of-commit-activity-data
     * @param filter Github filter
     */
    getCommitActivity(
        filter: GithubFilter
    ): AppFetchPromise<GithubCommitActivity>;
}

/**
 * Github commit activity data
 */
export interface GithubCommitActivity {
    /**
     * Count commit per week day
     */
    days: number[];
    /**
     * Sum commit per week
     */
    total: number;
    /**
     * Timestamp/1000 of week
     */
    week: number;
}

/**
 * Github unique resource name filter params
 */
export interface GithubUrnFilter {
    /**
     * Github user name param
     */
    owner: string;
    /**
     * Github repository name param
     */
    repo: string;
}

/**
 * Github query filter params
 */
// tslint:disable-next-line:no-empty-interface
export interface GithubQueryFilter {}

/**
 * Github filter
 */
export interface GithubFilter {
    /**
     * Urn filter params (required)
     */
    urn: GithubUrnFilter;
    /**
     * Query filter params (NOT required)
     */
    query: GithubQueryFilter;
}

/**
 * Github state
 */
export type GithubState<T> = AppState<GithubResult<T>>;

/**
 * Github api result
 */
export interface GithubResult<T> extends Array<T> {}

/**
 * Github view
 */
export interface GithubView<T> {
    /**
     * Container for data
     */
    result: T;
}
