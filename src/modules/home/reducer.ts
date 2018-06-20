import { GithubActionType } from "src/actions/github";
import { AppStatusType } from "src/constants/app";
import { AppActionVariant, AppSuccessAction } from "src/contracts/app";
import {
    GithubCommitActivity,
    GithubFilter,
    GithubResult,
    GithubStateProps
} from "src/contracts/github";
import { HomeState } from "src/modules/home/component";

export const homeInitialState: HomeState = {
    githubCommitActivity: {
        error: null,
        status: AppStatusType.INITIAL,
        view: null
    },
    homeFilter: {
        githubFilter: {
            query: {},
            urn: {
                owner: "dotnet",
                repo: "core"
            }
        }
    }
};

export type HomeActionVariants =
    | AppActionVariant<
          GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH,
          GithubResult<GithubCommitActivity>
      >
    | AppSuccessAction<GithubActionType.GITHUB_FILTER_UPDATE, GithubFilter>;

export const homeReducer = (
    state = homeInitialState,
    action: HomeActionVariants
): HomeState => {
    switch (action.type) {
        case GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH: {
            const nextState = (
                update: GithubStateProps<GithubCommitActivity>
            ): HomeState => {
                const githubCommitActivity = {
                    ...state.githubCommitActivity,
                    ...update
                };
                return {
                    ...state,
                    ...{
                        githubCommitActivity
                    }
                };
            };
            switch (action.status) {
                case AppStatusType.INITIAL:
                    return nextState({
                        error: null,
                        status: action.status,
                        view: null
                    });
                case AppStatusType.LOADING:
                    return nextState({
                        status: action.status
                    });
                case AppStatusType.SUCCESS:
                    return nextState({
                        error: null,
                        status: action.status,
                        view: action.payload
                    });
                case AppStatusType.INVALID:
                case AppStatusType.SERVER_ERROR:
                case AppStatusType.CLIENT_ERROR:
                case AppStatusType.TIMEOUT:
                case AppStatusType.REJECTED:
                    return nextState({
                        error: action.error,
                        status: action.status
                    });
                default:
                    return state;
            }
        }
        case GithubActionType.GITHUB_FILTER_UPDATE: {
            const newState = {
                ...state,
            };
            newState.homeFilter.githubFilter = {
                ...newState.homeFilter.githubFilter,
                ...action.payload
            };
            return newState;
        }
        default:
            return state;
    }
};
