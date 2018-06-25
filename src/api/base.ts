import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import * as qs from "qs";
import { CANCEL } from "redux-saga";
import { AppStatusType, AppSystemType } from "src/constants/app";
import {
    ApiErrorDetail,
    AppError,
    AppFetchPromise,
    AppFetchResult
} from "src/contracts/app";

export interface AppApiResponse<RESULT> extends AxiosResponse<RESULT> {
    fetch: AppFetchResult<RESULT>;
}

export interface AppApiError<RESULT> extends AxiosError {
    fetch: AppFetchResult<RESULT>;
}

export class BaseApi {
    protected headers: {};
    protected transport: AxiosInstance;

    public constructor(protected baseURL: string) {
        this.transport = axios.create({
            baseURL: "//" + baseURL,
            headers: {
                Accept: "application/json"
            },
            maxContentLength: 256,
            maxRedirects: 3,
            paramsSerializer: (params: {}) =>
                qs.stringify(params, {
                    indices: false,
                    skipNulls: true
                }),
            timeout: 30000,
            withCredentials: false
        });

        this.transport.interceptors.response.use(
            this.onFulfilled,
            this.onRejected
        );
    }

    protected get<T>(
        url: string,
        filter: {} = {},
        headers: {} = this.headers
    ): AppFetchPromise<T> {
        const source = axios.CancelToken.source();
        const request = this.transport.get<AppFetchResult<T>>(url, {
            cancelToken: source.token,
            headers,
            params: filter
        });
        const promise = request
            .then(result => {
                // tslint:disable-next-line:no-string-literal
                return result["fetch"];
            })
            .catch((error: AppApiError<T>) => error.fetch);
        request[CANCEL] = () => source.cancel(AppStatusType.REJECTED);

        return promise;
    }

    private onFulfilled = <RESULT>(
        response: AppApiResponse<RESULT>
    ): AppApiResponse<RESULT> => {
        response.fetch = this.successHandler(response);
        return response;
    };

    private onRejected = <RESULT>(
        error: AppApiError<RESULT>
    ): Promise<AppApiError<RESULT>> => {
        error.fetch = this.errorHandler(error);
        return Promise.reject<AppApiError<RESULT>>(error);
    };

    private successHandler<RESULT>(
        axiosResponse: AxiosResponse<RESULT>
    ): AppFetchResult<RESULT> {
        try {
            // TODO change setup axios to parse json here
            const { data } = axiosResponse;

            return {
                data,
                status: AppStatusType.SUCCESS
            };
        } catch (error) {
            return {
                error: this.buildError("Incorrect server side response."),
                status: AppStatusType.SERVER_ERROR
            };
        }
    }

    private errorHandler<RESULT>(error: AxiosError): AppFetchResult<RESULT> {
        if (axios.isCancel(error)) {
            return {
                error: this.buildError("Request canceled."),
                status: AppStatusType.REJECTED
            };
        } else if (
            error.code === "ECONNABORTED" ||
            (error.response && error.response.status === 408)
        ) {
            return {
                error: this.buildError("Server did not respond."),
                status: AppStatusType.TIMEOUT
            };
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            try {
                const apiError = error.response.data as {};

                const details: ApiErrorDetail[] = [
                    {
                        data: apiError,
                        source: this.baseURL,
                        system: AppSystemType.BACKEND
                    }
                ];

                if (
                    error.response.status >= 400 &&
                    error.response.status < 500
                ) {
                    return {
                        error: this.buildError(
                            "Invalid client side request.",
                            details
                        ),
                        status: AppStatusType.INVALID
                    };
                } else {
                    return {
                        error: this.buildError("Server error."),
                        status: AppStatusType.SERVER_ERROR
                    };
                }
            } catch (error) {
                return {
                    error: this.buildError("Server response incorrect."),
                    status: AppStatusType.SERVER_ERROR
                };
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return {
                error: this.buildError("Server no response."),
                status: AppStatusType.SERVER_ERROR
            };
        }

        // Something happened in setting up the request that triggered an Error
        return {
            error: this.buildError("Internal web app error."),
            status: AppStatusType.CLIENT_ERROR
        };
    }

    private buildError(
        message: string,
        details: ApiErrorDetail[] = []
    ): AppError {
        return {
            date: new Date().toISOString(),
            details,
            id: "00000000-0000-0000-0000-000000000000",
            message
        };
    }
}
