import { Action } from "redux";
import { ActionType } from "redux-saga/effects";
import { AppStatusType, AppSystemType } from "src/constants/app";

export interface AppError {
    id: string;
    date: string;
    message: string;
    details: ApiErrorDetail[];
}

export interface ApiErrorDetail {
    data: {};
    system: AppSystemType;
}

export type FETCH_FAILED =
    | AppStatusType.INVALID
    | AppStatusType.SERVER_ERROR
    | AppStatusType.CLIENT_ERROR
    | AppStatusType.REJECTED
    | AppStatusType.TIMEOUT;

export interface AppSuccessFetch<RESPONSE> {
    status: AppStatusType.SUCCESS;
    data: RESPONSE;
}

export interface AppFailedFetch {
    status: FETCH_FAILED;
    error: AppError;
}

export type AppFetch<RESPONSE> = AppSuccessFetch<RESPONSE> | AppFailedFetch;

export interface AppFetchPromise<RESPONSE>
    extends Promise<AppFetch<RESPONSE>> {}

export type AppAction<PAYLOAD> = Action & {
    payload: PAYLOAD;
};

export interface AppInitialAction<ACTION> {
    type: ACTION;
    status: AppStatusType.INITIAL;
}

export interface AppLoadingAction<ACTION> {
    type: ACTION;
    status: AppStatusType.LOADING;
}

export interface AppSuccessAction<ACTION, PAYLOAD> {
    type: ACTION;
    status: AppStatusType.SUCCESS;
    payload: PAYLOAD;
}

export interface AppFailAction<ACTION> {
    type: ACTION;
    status: FETCH_FAILED;
    error: AppError;
}

export type AppActionVariant<ACTION, PAYLOAD> =
    | AppInitialAction<ACTION>
    | AppLoadingAction<ACTION>
    | AppSuccessAction<ACTION, PAYLOAD>
    | AppFailAction<ACTION>;

export interface AppActionPromise<PAYLOAD>
    extends Promise<AppActionVariant<ActionType, PAYLOAD>> {}

export interface AppInitialStateProps {
    status: AppStatusType.INITIAL;
    view: null;
    error: null;
}

export interface AppLoadingStateProps {
    status: AppStatusType.LOADING;
}

export interface AppSuccessStateProps<VIEW> {
    status: AppStatusType.SUCCESS;
    view: VIEW;
    error: null;
}

export interface AppFailStateProps {
    status: FETCH_FAILED;
    error: AppError;
}

export type AppStateProps<VIEW> =
    | AppInitialStateProps
    | AppLoadingStateProps
    | AppSuccessStateProps<VIEW>
    | AppFailStateProps;

export interface AppDispatch {
    dispatch(action: Action): void;
}

export type AppPartial<T> = { [P in keyof T]?: T[P] };

export interface AppOption<T> {
    key: T;
    label: string;
}
