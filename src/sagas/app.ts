// https://decembersoft.com/posts/4-tips-for-managing-many-sagas-in-a-react-redux-saga-app/

import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { githubRootSaga } from "src/sagas/github";

export function* appRootSaga(): SagaIterator {
    yield all([fork(githubRootSaga)]);
}
