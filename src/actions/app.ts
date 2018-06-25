import {
    AppStatusType,
    AppSystemType,
    AppVisualStateType
} from "src/constants/app";
import {
    AppAction,
    AppActionVariant,
    AppFailAction,
    AppFailedFetchResult,
    AppFetchResult,
    AppLoadingAction,
    AppPartial,
    AppSuccessAction
} from "src/contracts/app";
import { AppActionType, AppState } from "src/modules/app";

export const appSuccessAction = <PAYLOAD>(
    type: string,
    payload: PAYLOAD
): AppSuccessAction<string, PAYLOAD> => ({
    payload,
    status: AppStatusType.SUCCESS,
    type
});

export const appRejectAction = (type: string): AppFailAction<string> => ({
    error: {
        date: new Date().toISOString(),
        details: [
            {
                data: "Action canceled.",
                source: location.host,
                system: AppSystemType.FRONTEND
            }
        ],
        id: "00000000-0000-0000-0000-000000000001",
        message: "Action canceled."
    },
    status: AppStatusType.REJECTED,
    type
});

export const appFailAction = (
    type: string,
    fail: AppFailedFetchResult
): AppFailAction<string> => ({
    error: fail.error,
    status: fail.status,
    type
});

export const appClientErrorAction = (
    type: string,
    error: Error
): AppFailAction<string> => ({
    error: {
        date: new Date().toISOString(),
        details: [
            {
                data: error.stack ? error.stack : "Unhandled error.",
                source: location.host,
                system: AppSystemType.FRONTEND
            }
        ],
        id: "00000000-0000-0000-0000-000000000000",
        message: error.message
    },
    status: AppStatusType.CLIENT_ERROR,
    type
});

export const appLoadAction = (type: string): AppLoadingAction<string> => ({
    status: AppStatusType.LOADING,
    type
});

export const appAction = <PAYLOAD>(
    type: string,
    response: AppFetchResult<PAYLOAD>
): AppActionVariant<string, PAYLOAD> => {
    switch (response.status) {
        case AppStatusType.SUCCESS: {
            return appSuccessAction(type, response.data);
        }
        case AppStatusType.CLIENT_ERROR:
        case AppStatusType.SERVER_ERROR:
        case AppStatusType.INVALID:
        case AppStatusType.REJECTED:
        case AppStatusType.TIMEOUT: {
            return appFailAction(type, response);
        }
        default: {
            throw new Error(`Not implemented status.`);
        }
    }
};

export const appSidebarHideAction = (): AppAction<AppPartial<AppState>> => ({
    payload: {
        sidebar: AppVisualStateType.HIDDEN
    },
    type: AppActionType.APP_ADD_STATE
});

export const appSidebarShowAction = (): AppAction<AppPartial<AppState>> => ({
    payload: {
        sidebar: AppVisualStateType.HIDDEN
    },
    type: AppActionType.APP_REMOVE_STATE
});
