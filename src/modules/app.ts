import { routerReducer, RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import { AppVisualStateType } from "src/constants/app";
import { AppAction, AppPartial } from "src/contracts/app";
import { HomeState } from "src/modules/home/component";
import { homeInitialState, homeReducer } from "src/modules/home/reducers";

export interface AppState {
    asideMenu: AppVisualStateType;
    header: AppVisualStateType;
    sidebar: AppVisualStateType;
}

export interface AppRootState {
    app: AppState;
    router?: RouterState;
    home: HomeState;
}

export const appInitialState: AppState = {
    asideMenu: AppVisualStateType.FIXED | AppVisualStateType.HIDDEN,
    header: AppVisualStateType.FIXED,
    sidebar: AppVisualStateType.FIXED
};

export const appInitialRootState: AppRootState = {
    app: appInitialState,
    home: homeInitialState,
    router: {
        location: null
    }
};

export enum AppActionType {
    APP_SET_STATE = "APP_SET_STATE",
    APP_ADD_STATE = "APP_ADD_STATE",
    APP_REMOVE_STATE = "APP_REMOVE_STATE"
}

export const appReducer = (
    state = appInitialState,
    action: AppAction<AppPartial<AppState>>
): AppState => {
    switch (action.type) {
        case AppActionType.APP_SET_STATE: {
            return {
                ...state,
                ...action.payload
            };
        }
        case AppActionType.APP_ADD_STATE: {
            const newState = {
                ...state
            };

            if (action.payload.asideMenu) {
                newState.asideMenu |= action.payload.asideMenu;
            }

            if (action.payload.header) {
                newState.header |= action.payload.header;
            }

            if (action.payload.sidebar) {
                newState.sidebar |= action.payload.sidebar;
            }

            return newState;
        }
        case AppActionType.APP_REMOVE_STATE: {
            const newState = {
                ...state
            };

            if (action.payload.asideMenu) {
                newState.asideMenu ^= action.payload.asideMenu;
            }

            if (action.payload.header) {
                newState.header ^= action.payload.header;
            }

            if (action.payload.sidebar) {
                newState.sidebar ^= action.payload.sidebar;
            }

            return newState;
        }
        default: {
            return state;
        }
    }
};

export const appRootReducer = combineReducers<AppRootState>({
    app: appReducer,
    home: homeReducer,
    router: routerReducer
});
