# HttpClient

## Overview

HttpClient is a simple HTTP client for making asynchronous HTTP requests in JavaScript using built-in fetch api. It supports various HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.

## Installation
- using npm
    ```bash
    npm i @bonny-kato/httpclient
    ```
- using yarn
    ```bash
    yarn add @bonny-kato/httpclient
    ```


## Usage
### Constructor
```ts
import HttpClient from "@bonny-kato/httpclient";

const httpClient = new HttpClient({
    baseUrl: 'https://api.example.com',
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    }
});
```


### Methods

### get
Makes an asynchronous GET request to the specified endpoint.

```ts
httpClient.get(endpoint);
```

### post
Make a POST request to the specified endpoint with the provided data
```ts
httpClient.post(endpoint, data);
```

### put
Sends a PUT request to the specified endpoint with the provided data.
```ts
httpClient.put(endpoint, data);
```

### remove
Removes a resource from the server.
```ts
httpClient.remove(endpoint);
```


### Examples
```ts
// Get users
const getUsers = () => {
    return httpClient.get("/users");
}

// Add user
const addUser = (data: User) => {
    return httpClient.post("/users", data);
}

// Update user
const updateUser = (userId: string, data: User) => {
    return httpClient.put(`/users/${userId}`, data);
}

// Remove user
const removeUser = (userId: string) => {
    return httpClient.remove(`/users/${userId}`);
}
```
### Interfaces

#### `IHeaders`

```typescript
export interface IHeaders {
    "Content-Type"?: "multipart/form-data" | "application/json" | undefined;
    Authorization?: string;
}
```

#### `IHeaders`
```ts
export interface IConfig {
    baseUrl: string;
    headers?: IHeaders;
}
```

#### `HttpMethod`
```ts
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```


### API Reference

#### Constructor

#### `new HttpClient(config: IConfig)`

Create a new instance of HttpClient.

- `config`: An object containing configuration options.
    - `baseUrl` (string): The base URL for API requests.
    - `headers` (IHeaders): Optional. Custom headers to be included in each request.

#### Methods

#### `request(method: HttpMethod, endpoint: string, data?: any): Promise<any>`

Makes a generic HTTP request.

- `method` (HttpMethod): The HTTP method for the request.
- `endpoint` (string): The endpoint URL.
- `data` (any): Optional. Data to be sent in the request body.

#### `get(endpoint: string): Promise<any>`

Makes an asynchronous GET request.

- `endpoint` (string): The endpoint URL.

#### `post(endpoint: string, data: object): Promise<any>`

Makes a POST request.

- `endpoint` (string): The endpoint URL.
- `data` (object): Data to be sent in the request body.

#### `put(endpoint: string, data: object): Promise<any>`

Sends a PUT request.

- `endpoint` (string): The endpoint URL.
- `data` (object): Data to be sent in the request body.

#### `remove(endpoint: string): Promise<void>`

Removes a resource.

- `endpoint` (string): The endpoint URL.


### License

This project is licensed under the MIT License
