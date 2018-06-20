import { Action } from "redux";
import { ActionType } from "redux-saga/effects";
import { AppStatusType, AppSystemType } from "src/constants/app";

/**
 * Default error format
 */
export interface AppError {
    /**
     * Identity guid. Maybe generated on client or server side
     */
    id: string;
    /**
     * Error time (UTC)
     */
    date: string;
    /**
     * Error mesage
     */
    message: string;
    /**
     * Error details array
     */
    details: ApiErrorDetail[];
}

/**
 * Default error detail format
 */
export interface ApiErrorDetail {
    /**
     * Variouse error from different api
     */
    data: {};
    /**
     * Side of error. Place where error throw
     */
    system: AppSystemType;
}

/**
 * Default app types of invalidate fetch status variants
 */
export type FETCH_FAILED =
    | AppStatusType.INVALID
    | AppStatusType.SERVER_ERROR
    | AppStatusType.CLIENT_ERROR
    | AppStatusType.REJECTED
    | AppStatusType.TIMEOUT;

/**
 * Default app success fetch response result container
 */
export interface AppSuccessFetchResult<RESPONSE> {
    /**
     * Success status
     */
    status: AppStatusType.SUCCESS;
    /**
     * Response data
     */
    data: RESPONSE;
}

/**
 * Default app failed fetch response result container
 */
export interface AppFailedFetchResult {
    /**
     * Variant of failed status
     */
    status: FETCH_FAILED;
    /**
     * App error
     */
    error: AppError;
}

/**
 * Default app fetch result variants
 */
export type AppFetchResult<RESPONSE> =
    | AppSuccessFetchResult<RESPONSE>
    | AppFailedFetchResult;

/**
 * Default app fetch promise format
 */
export interface AppFetchPromise<RESPONSE>
    extends Promise<AppFetchResult<RESPONSE>> {}

/**
 * Default app action
 */
export type AppAction<PAYLOAD> = Action & {
    /**
     * Action payload data
     */
    payload: PAYLOAD;
};

/**
 * Default app initial action container
 */
export interface AppInitialAction<ACTION> {
    /**
     * Action type
     */
    type: ACTION;
    /**
     * Initial status
     */
    status: AppStatusType.INITIAL;
}

/**
 * Default app loading action container
 */
export interface AppLoadingAction<ACTION> {
    /**
     * Action type
     */
    type: ACTION;
    /**
     * Loading status
     */
    status: AppStatusType.LOADING;
}

/**
 * Default app success action container
 */
export interface AppSuccessAction<ACTION, PAYLOAD> {
    /**
     * Action type
     */
    type: ACTION;
    /**
     * Succes status
     */
    status: AppStatusType.SUCCESS;
    /**
     * Payload data
     */
    payload: PAYLOAD;
}

/**
 * Default app fail action container
 */
export interface AppFailAction<ACTION> {
    /**
     * Action type
     */
    type: ACTION;
    /**
     * Variant of failed status
     */
    status: FETCH_FAILED;
    /**
     * Error
     */
    error: AppError;
}

/**
 * Default app action variants
 */
export type AppActionVariant<ACTION, PAYLOAD> =
    | AppInitialAction<ACTION>
    | AppLoadingAction<ACTION>
    | AppSuccessAction<ACTION, PAYLOAD>
    | AppFailAction<ACTION>;

/**
 * Default app action promise
 */
export interface AppActionPromise<PAYLOAD>
    extends Promise<AppActionVariant<ActionType, PAYLOAD>> {}

/**
 * Default app initial state container
 */
export interface AppInitialState {
    /**
     * Initial status
     */
    status: AppStatusType.INITIAL;
    /**
     * View. Always null
     */
    view: null;
    /**
     * Error. Always null
     */
    error: null;
}

/**
 * Default app loading state container
 */
export interface AppLoadingState {
    /**
     * Loading status
     */
    status: AppStatusType.LOADING;
}

/**
 * Default app succes state container
 */
export interface AppSuccessState<VIEW> {
    /**
     * Succes status
     */
    status: AppStatusType.SUCCESS;
    /**
     * View data
     */
    view: VIEW;
    /**
     * Error. Always null
     */
    error: null;
}

/**
 * Default app fail state container
 */
export interface AppFailState {
    /**
     * Fetch failed status
     */
    status: FETCH_FAILED;
    /**
     * Fetch error
     */
    error: AppError;
}

/**
 * Default app state type variants
 */
export type AppState<VIEW> =
    | AppInitialState
    | AppLoadingState
    | AppSuccessState<VIEW>
    | AppFailState;

/**
 * Default app
 */
export interface AppDispatch {
    /**
     * Action dispatcher
     * @param action You action
     */
    dispatch(action: Action): void;
}

/**
 * Wrapper around the object. Now object property can be undefined
 */
export type AppPartial<T> = { [P in keyof T]?: T[P] };

/**
 * Default app format for select options
 */
export interface AppOption<T> {
    /**
     * Option id
     */
    key: T;
    /**
     * Option name
     */
    label: string;
}
