export interface CurlParam {
  name: string;
  example?: string;
  required?: boolean;
}

export interface GenerateCurlOptions {
  method: string;
  path: string;
  /** Datadog site domain, e.g. 'datadoghq.com' */
  site?: string;
  /** Subdomain of the API host, e.g. 'api'. Defaults to 'api'. */
  subdomain?: string;
  pathParams?: CurlParam[];
  queryParams?: CurlParam[];
  /** Prettified JSON string for the request body */
  requestBodyJson?: string;
  /** Security requirements from the operation (used to determine which auth headers to include) */
  security?: any[];
}
