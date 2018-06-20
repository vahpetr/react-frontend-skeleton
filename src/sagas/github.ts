import { SagaIterator } from "redux-saga";
import { all, call, put, race, take, throttle } from "redux-saga/effects";
import {
    appAction,
    appClientErrorAction,
    appLoadAction,
    appRejectAction,
    appSuccessAction
} from "src/actions/app";
import { GithubActionType } from "src/actions/github";
import { DefaultGithubApi } from "src/api/github";
import { AppAction } from "src/contracts/app";
import { GithubApi, GithubFilter } from "src/contracts/github";

// TODO add resolve from di
const api: GithubApi = new DefaultGithubApi();

export function* githubCommitActivityFetchSaga(
    action: AppAction<GithubFilter>
): SagaIterator {
    const type = GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH;
    try {
        yield put(appLoadAction(type));

        const { reject, response } = yield race({
            reject: take(GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH_REJECT),
            response: call(api.getCommitActivity, action.payload)
        });

        if (reject) {
            yield put(appRejectAction(type));
        } else {
            yield put(appAction(type, response));
        }
    } catch (error) {
        yield put(appClientErrorAction(type, error));
    }
}

export function* githubFilterUpdateSaga(
    action: AppAction<GithubFilter>
): SagaIterator {
    yield put(
        appSuccessAction(GithubActionType.GITHUB_FILTER_UPDATE, action.payload)
    );
    yield call(githubCommitActivityFetchSaga, action);
}

export function* githubRootSaga(): SagaIterator {
    yield all([
        // TODO check throttle work, may be need use takeLatest or special saga effect realization
        throttle(
            700,
            GithubActionType.GITHUB_COMMIT_ACTIVITY_FETCH_INIT,
            githubCommitActivityFetchSaga
        ),
        throttle(
            700,
            GithubActionType.GITHUB_FILTER_UPDATE_INIT,
            githubFilterUpdateSaga
        )
    ]);
}
