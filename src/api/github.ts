import { BaseApi } from "src/api/base";
import { AppFetchPromise } from "src/contracts/app";
import {
    GithubApi,
    GithubCommitActivity,
    GithubFilter
} from "src/contracts/github";

export class DefaultGithubApi extends BaseApi implements GithubApi {
    constructor() {
        super("https://api.github.com");
    }

    public getCommitActivity = (
        filter: GithubFilter
    ): AppFetchPromise<GithubCommitActivity> => {
        const { owner, repo } = filter.urn;
        return this.get<GithubCommitActivity>(`/repos/${owner}/${repo}/stats/commit_activity`, filter.query);
    };
}
