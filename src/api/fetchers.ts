/* eslint-disable @typescript-eslint/no-explicit-any */
import _isNil from 'lodash-es/isNil';

export interface CustomApiError extends Error {
  reason?: string;
  status?: number;
}

export interface FetchOptions {
  body?: { [key: string]: any };
  cookie?: string | null;
  endpoint: string;
  headers?: { [headerName: string]: string } | null;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string | boolean | number | undefined | null>;
}

export interface Api {
  delete: typeof deleteJson;
  get: typeof getJson;
  post: typeof postJson;
  put: typeof putJson;
}

const changeResponseToJson = async <T = Record<string, string>>(response: Response) => {
  return response.json().then((json) => ({
    response,
    json: json as unknown as T,
  }));
};

const cleanParams = (
  params: { [key: string]: string | number | boolean | undefined | null } = {},
) => {
  const copiedParams = Object.assign({}, params) as { [key: string]: string | number | boolean };
  Object.keys(copiedParams).forEach((key) => {
    if (_isNil(copiedParams[key])) {
      delete copiedParams[key];
    }
  });

  return copiedParams;
};

const createCustomApiError = (json: any): CustomApiError => {
  const error = new Error() as CustomApiError;
  error.reason =
    json.error.errors && json.error.errors.length > 0 ? json.error.errors[0].reason : '';
  error.status = json.error.code;

  return error;
};

const fetchJson = <T>({
  body,
  endpoint,
  headers: extraHeaders,
  method = 'GET',
}: FetchOptions): Promise<T> => {
  const headers: { [headerName: string]: string } = {
    accept: 'application/json',
  };

  if (extraHeaders) {
    Object.assign(headers, extraHeaders);
  }

  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(changeResponseToJson)
    .then(({ response, json }) => {
      const parsedBody = json as unknown as T;

      if (response.ok) {
        return { ...parsedBody };
      }

      throw createCustomApiError(json);
    });
};

export const deleteJson = <T>({ endpoint, body = {}, headers }: FetchOptions): Promise<T> => {
  return fetchJson<T>({
    endpoint,
    method: 'DELETE',
    headers,
    body,
  });
};

export const getJson = <T>({ endpoint, params, headers }: FetchOptions): Promise<T> => {
  let qs = '';
  const cleanedParams = cleanParams(params);

  if (Object.keys(cleanedParams).length > 0) {
    qs = `?${new URLSearchParams(cleanedParams as { [key: string]: any })}`;
  }

  return fetchJson<T>({
    endpoint: `${endpoint}${qs}`,
    headers,
  });
};

export const postJson = <T>({ endpoint, body, headers, cookie }: FetchOptions): Promise<T> => {
  return fetchJson<T>({
    endpoint,
    method: 'POST',
    headers,
    cookie,
    body,
  });
};

export const putJson = <T>({ endpoint, body, headers, cookie }: FetchOptions): Promise<T> => {
  return fetchJson<T>({
    endpoint,
    method: 'PUT',
    headers,
    cookie,
    body,
  });
};

const fetchers: Api = {
  get: getJson,
  delete: deleteJson,
  post: postJson,
  put: putJson,
};

export default fetchers;
