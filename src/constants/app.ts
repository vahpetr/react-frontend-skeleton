/**
 * Type of sort direction
 */
export enum AppSortDirectionType {
    /**
     * By ASC
     */
    ASC = "asc",
    /**
     * By DESC
     */
    DESC = "desc"
}

/**
 * Default app statuses for remote fetch actions
 */
export enum AppStatusType {
    /**
     * Not fetching before
     */
    INITIAL = "initial",
    /**
     * Loading now
     */
    LOADING = "loading",
    /**
     * Loading success
     */
    SUCCESS = "success",
    /**
     * Invalid request parameters
     */
    INVALID = "invalid",
    /**
     * Internal server error
     */
    SERVER_ERROR = "server-error",
    /**
     * Unhandled exception on client side
     */
    CLIENT_ERROR = "client-error",
    /**
     * Server not response
     */
    TIMEOUT = "timeout",
    /**
     * User canceled fetch action
     */
    REJECTED = "reject"
}

/**
 * Default system type
 */
export enum AppSystemType {
    /**
     * Client
     */
    FRONTEND = "frontend",
    /**
     * Server
     */
    BACKEND = "backend"
}

/**
 * Default visualization type
 */
export enum AppVisualStateType {
    /**
     * Element fixed
     */
    FIXED = 1,
    /**
     * Element hidden
     */
    HIDDEN = 2
}
