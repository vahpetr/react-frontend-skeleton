import { Action } from "redux";
import { AppAction } from "src/contracts/app";
import { GithubFilter } from "src/contracts/github";

export enum GithubActionType {
    GITHUB_COMMIT_ACTIVITY_FETCH = "GITHUB_COMMIT_ACTIVITY_FETCH",
    GITHUB_COMMIT_ACTIVITY_FETCH_INIT = "GITHUB_COMMIT_ACTIVITY_FETCH_INIT",
    GITHUB_COMMIT_ACTIVITY_FETCH_REJECT = "GITHUB_COMMIT_ACTIVITY_FETCH_REJECT",
    GITHUB_FILTER_UPDATE = "GITHUB_FILTER_UPDATE",
    GITHUB_FILTER_UPDATE_INIT = "GITHUB_FILTER_UPDATE_INIT"
}

export const githubCommitActivityFetchInit = (
    filter: GithubFilter
): AppAction<GithubFilter> => ({
    payload: filter,
    type: GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH_INIT
});

export const githubCommitActivityFetchReject = (): Action => ({
    type: GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH_REJECT
});

export const githubFilterUpdate = (
    filter: GithubFilter
): AppAction<GithubFilter> => ({
    payload: filter,
    type: GithubActionType.GITHUB_FILTER_UPDATE_INIT
});
