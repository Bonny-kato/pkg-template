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
     * @return {Promise<any>} - A promise that resolves with the response data from the GET request.
     * @example
     * const getUsers = () => {
     *     return httpClient.get("/users");
     * }
     */
    public async get(endpoint: string): Promise<any> {
        return this.request("GET", endpoint, null);
    }

    /**
     * Makes a POST request to the specified endpoint with the provided data.
     * @param {string} endpoint - The endpoint URL to make the POST request to.
     * @param {object} data - The data to be sent in the request body.
     * @return {Promise} - A Promise that resolves with the response from the POST request.
     * @example
     * const addUser = (data:User) => {
     *     return httpClient.remove("/users", data);
     * }
     */
    public async post(endpoint: string, data: object) {
        return this.request("POST", endpoint, data);
    }

    /**
     * Sends a PUT request to the specified endpoint with the provided data.
     *
     * @param {string} endpoint - The endpoint URL to send the request to.
     * @param {object} data - The data to be sent in the request body.
     * @return {Promise} - A Promise that resolves with the response from the server.
     * @example
     * const updateUser = (userId:string, data:User) => {
     *     return httpClient.put("/users ${userId}", data);
     * }
     */
    public async put(endpoint: string, data: object) {
        return this.request("PUT", endpoint, data);
    }

    /**
     * Removes a resource from the server.
     *
     * @param {string} endpoint - The endpoint of the resource to be removed.
     * @return {Promise<void>} - A Promise that resolves when the resource is successfully removed.
     * @example
     * const removeUser = (userId:string) => {
     *     return httpClient.remove("/users ${userId}");
     * }
     */
    public async remove(endpoint: string) {
        return this.request("DELETE", endpoint, null);
    }

    private async request(method: HttpMethod, endpoint: string, data?: any) {
        const requestProps = this.getRequestConfig(method, data);
        const response = await fetch(this.#baseUrl + endpoint, requestProps);
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
            headers.append(key, value);
        });
        return headers;
    }

    /**
     * Generates the request configuration object for making HTTP requests.
     *
     * @private
     * @param {HttpMethod} method - The HTTP method for the request.
     * @param {any} [data] - The data to be sent in the request body.
     * @returns {RequestInit} The request configuration object.
     */
    private getRequestConfig(method: HttpMethod, data?: any): RequestInit {
        const headers = this.createdHeaders({
            "Content-Type": "application/json",
            ...this.#headers,
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
