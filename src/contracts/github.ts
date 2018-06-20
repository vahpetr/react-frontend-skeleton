import { AppFetchPromise, AppStateProps } from "src/contracts/app";

export interface GithubApi {
    getCommitActivity(
        filter: GithubFilter
    ): AppFetchPromise<GithubCommitActivity>;
}

export interface GithubCommitActivity {
    days: number[];
    total: number;
    week: number;
}

export interface GithubUrnFilter {
    owner: string;
    repo: string;
}

// tslint:disable-next-line:no-empty-interface
export interface GithubQueryFilter {
}

export interface GithubFilter {
    urn: GithubUrnFilter;
    query: GithubQueryFilter;
}

export type GithubStateProps<T> = AppStateProps<GithubResult<T>>;

export interface GithubResult<T> extends Array<T> {}

export interface GithubView<T> {
    result: T;
}
