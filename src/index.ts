"use client"
/**
 * A class for interacting with the local storage and storing/retrieving values.
 */
 class LocalStorage {
    STORE_KEY: string;

    constructor(STORE_KEY: string) {
        this.STORE_KEY = STORE_KEY;
    }

    /**
     * Retrieves the value from the local storage based on the provided key. If the key is not provided,
     * it returns the entire local storage object. If the key is provided and exists in the local storage,
     * it returns the corresponding value. Otherwise, it returns the default value.
     *
     * @param {string|null} [key=null] - The key to retrieve the value from the local storage. If not provided,
     *                                   it returns the entire local storage object.
     * @example
     *  const value = getValue("my-key", defaultValueIfExist)
     * @param {any} defaultValue - The default value to be returned if the key doesn't exist in the local storage.
     * @returns  - The value retrieved from the local storage or the default value if the key doesn't exist.
     */
    getValue(
        key: string | null = null,
        defaultValue?: any,
    ) {
        const store = JSON.parse(localStorage.getItem(this.STORE_KEY) || "{}");
        if (key === null) {
            return store;
        }
        return key in store ? store[key] : defaultValue ;
    }

    /**
     * Sets the value for the given key in the local storage.
     * If the key already exists, its value will be updated.
     * @example
     *  const value = setValue("my-key", {key:value}) // a value can be anything
     *
     * @param {string} key - The key for storing the value.
     * @param {string | boolean | Array<any> | object} value - The value to be stored.
     */
    setValue(
        key: string,
        value: string | boolean | Array<any> | object,
    ) {
        const store = this.getValue(null, {});
        store[key] = value;
        window.localStorage.setItem(this.STORE_KEY, JSON.stringify(store));
    }


    /**
     * Sets the values of the object using the provided data object.
     *
     * @example
     *  const value = setValues({ "my-key1": "my-value", "my-key2": {key:"value"}})
     * @param {object} data - The data object containing key-value pairs.
     */
    setValues(data: object) {
        Object.entries(data).forEach(([key, value]) => {
            this.setValue(key, value);
        });
    }

    /**
     * Remove specified keys from the stored values in the local storage.
     *
     * @param {string | Array<string>} keys - The key(s) to be removed from the stored values.
     *    If a single string is provided, it is treated as a single key. If an array of strings is provided,
     *    each string represents a key that should be removed.
     *
     * @example
     * const value = removeValues(["key1", "key2", "key3"])
     *
     * @return {void}
     */
    removeValues(keys: string | Array<string>): void {
        const store = this.getValue();
        const arrOfKeys = Array.isArray(keys) ? keys : [keys];
        arrOfKeys.forEach((_key) => {
            delete store[_key];
        });

        window.localStorage.removeItem(this.STORE_KEY);
        window.localStorage.setItem(this.STORE_KEY, JSON.stringify(store));
    }
}


export default LocalStorage;
