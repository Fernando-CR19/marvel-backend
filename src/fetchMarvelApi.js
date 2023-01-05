import md5 from "md5";
import { stringifyUrl } from "query-string";
import fetch from "node-fetch";

export const defaultHeaders = {
    "Content-Type": "application/json",
};

export const fetchMarvelApi = async (
    resource = "",
    method = "GET",
    body = null,
    options = {}
) => {
    const API_URL = process.env.MARVEL_API_BASE;
    const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

    const ts = new Date().getTime();
    const hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
    const url = `${API_URL}/${resource}`;
    const uri = stringifyUrl({
        url: url,
        query: {
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
        },
    });
    return fetch(uri, {
        method,
        body,
        headers: defaultHeaders,
        ...options,
    });
};