export interface IHeaders {
    "Content-Type"?:
        | "multipart/form-data"
        | "application/json"
        | "text/html"
        | "text/plain"
        | "application/xhtml+xml"
        | "application/xml"
        | undefined;
    Authorization?: string;
    "Accept-Language"?: string;
    "User-Agent"?: string;
    "Accept-Encoding"?: string;
    "Cache-Control"?:
        | "no-cache"
        | "no-store"
        | "max-age"
        | "must-revalidate"
        | undefined;
    Pragma?: string;
    Expire?: string;
    "Keep-Alive"?: boolean;
    "If-Modified-Since"?: string;
    "If-None-Match"?: string;
    Connection?: "close" | "keep-alive" | undefined;
    Date?: string;
    "Transfer-Encoding"?: "chunked" | undefined;
    Upgrade?: string;
    Via?: string;
    Warning?: string;
    "WWW-Authenticate"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Credentials"?: string;
    "Access-Control-Expose-Headers"?: string;
    "Access-Control-Max-Age"?: string;
    "Access-Control-Allow-Methods"?: string;
    "Access-Control-Allow-Headers"?: string;
    Origin?: string;
    "Accept-Charset"?: string;
    "X-Frame-Options"?: string;
    "X-XSS-Protection"?: string;
    "Content-Security-Policy"?: string;
    "Strict-Transport-Security"?: string;
    "X-Content-Type-Options"?: string;
    "Referrer-Policy"?: string;
    [key: string]: string | boolean | undefined;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IConfig {
    baseUrl: string;
    headers?: IHeaders;
}
