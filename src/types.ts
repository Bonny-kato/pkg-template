export interface IHeaders {
    "Content-Type"?: "multipart/form-data" | "application/json" | undefined;
    Authorization?: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IConfig {
    baseUrl: string;
    headers?: IHeaders;
}
