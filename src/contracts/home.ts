import { GithubFilter } from "src/contracts/github";

/**
 * Filter on home page
 */
export interface HomeFilter {
    /**
     * Gitlab filter
     */
    githubFilter: GithubFilter;
}
