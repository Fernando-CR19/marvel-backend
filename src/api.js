import fetch from 'node-fetch';
import md5 from "md5";
import { stringifyUrl } from "query-string";

export const API_URL = process.env.MARVEL_API_BASE;
export const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
export const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export const fetchApi = async (
  resource = "",
  method = "GET",
  body = null,
  options = {}
) => {
  const ts = new Date().getTime();
  const hash = md5(`${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`);
  const url = `${process.env.MARVEL_API_BASE}/${resource}`;
  const uri = stringifyUrl({
    url: url,
    query: {
      ts: ts,
      apikey: process.env.MARVEL_PUBLIC_KEY,
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
