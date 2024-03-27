import { HttpMethod, IConfig, IHeaders } from "./types";

class HttpClient {
    #baseUrl: string;
    #headers: IHeaders | undefined;

    constructor(config: IConfig) {
        this.#baseUrl = config.baseUrl;
        this.#headers = config.headers;
    }

    /**
     * Makes an asynchronous GET request to the specified endpoint.
     *
     * @param {string} endpoint - The endpoint URL to send the GET request to.
     * @param {IConfig} customConfig - Custom config to be included in the request (optional).
     * @return {Promise<any>} - A promise that resolves with the response data from the GET request.
     * @example
     * const getUsers = () => {
     *     return httpClient.get("/users");
     * }
     */
    public async get(
        endpoint: string,
        customConfig?: Partial<IConfig>,
    ): Promise<any> {
        return this.request("GET", endpoint, null, customConfig);
    }

    /**
     * Makes a POST request to the specified endpoint with the provided data.
     * @param {string} endpoint - The endpoint URL to make the POST request to.
     * @param {object} data - The data to be sent in the request body.
     * @param customConfig - Custom config to be included in the request (optional).
     * @return {Promise} - A Promise that resolves with the response from the POST request.
     * @example
     * const addUser = (data:User) => {
     *     return httpClient.post("/users", data);
     * }
     */
    public async post(
        endpoint: string,
        data: object,
        customConfig?: Partial<IConfig>,
    ) {
        return this.request("POST", endpoint, customConfig);
    }

    /**
     * Sends a PUT request to the specified endpoint with the provided data.
     *
     * @param {string} endpoint - The endpoint URL to send the request to.
     * @param {object} data - The data to be sent in the request body.
     * @param customConfig - Custom config to be included in the request (optional).
     * @return {Promise} - A Promise that resolves with the response from the server.
     * @example
     * const updateUser = (userId:string, data:User) => {
     *     return httpClient.put("/users ${userId}", data);
     * }
     */
    public async put(
        endpoint: string,
        data: object,
        customConfig?: Partial<IConfig>,
    ) {
        return this.request("PUT", endpoint, data, customConfig);
    }

    /**
     * Removes a resource from the server.
     *
     * @param {string} endpoint - The endpoint of the resource to be removed.
     * @return {Promise<void>} - A Promise that resolves when the resource is successfully removed.
     * @param customConfig - Custom config to be included in the request (optional).
     * @example
     * const removeUser = (userId:string) => {
     *     return httpClient.remove("/users ${userId}");
     * }
     */
    public async remove(endpoint: string, customConfig?: Partial<IConfig>) {
        return this.request("DELETE", endpoint, null, customConfig);
    }

    private async request(
        method: HttpMethod,
        endpoint: string,
        data?: any,
        config?: Partial<IConfig>,
    ) {
        const requestProps = this.getRequestConfig(
            method,
            data,
            config?.headers,
        );
        const baseUrl = config?.baseUrl ?? this.#baseUrl;
        const response = await fetch(baseUrl + endpoint, requestProps);
        if (!response.ok) throw response;
        return await response.json();
    }

    private isFormData<T = unknown>(payload: T): boolean {
        return payload instanceof FormData;
    }

    /**
     * Creates and returns a new Headers object based on the provided headers configuration.
     *
     * @param {IHeaders} headersConfig - The configuration object for the headers, where each key represents the header name and each value represents the header value.
     * @return {Headers} - The newly created Headers object populated with the provided configuration.
     */
    private createdHeaders(headersConfig: IHeaders): Headers {
        const headers = new Headers();
        Object.entries(headersConfig).forEach(([key, value]) => {
            headers.append(key, String(value));
        });
        return headers;
    }

    /**
     * Creates the configuration object for a network request.
     *
     * @param {HttpMethod} method - The HTTP method of the request.
     * @param {any} [data] - The data to be sent with the request (optional).
     * @param {IHeaders} [customHeaders] - Additional headers to be included in the request (optional).
     *
     * @returns {RequestInit} The configuration object for the request.
     */
    private getRequestConfig(
        method: HttpMethod,
        data?: any,
        customHeaders?: IHeaders,
    ): RequestInit {
        const headers = this.createdHeaders({
            "Content-Type": "application/json",
            ...this.#headers,
            ...customHeaders,
        });

        if (data && this.isFormData(data)) {
            headers.delete("Content-Type");
        }

        return {
            method: method,
            headers: this.createdHeaders({
                "Content-Type": "application/json",
                ...this.#headers,
            }),
            ...(data && { body: JSON.stringify(data) }),
        };
    }
}

export default HttpClient;
