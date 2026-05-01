/**
 * Curl command generation from OpenAPI operation data.
 *
 * Produces a copy-pasteable curl snippet for each API endpoint,
 * including auth headers, query parameters, and request body.
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Replace `{param_name}` placeholders in the path with example values or
 * shell-friendly uppercase placeholders.
 */
function interpolatePath(path: string, pathParams?: CurlParam[]): string {
  if (!pathParams || pathParams.length === 0) return path;

  let result = path;
  for (const param of pathParams) {
    const placeholder = `{${param.name}}`;
    const value = param.example ?? `\${${param.name.toUpperCase()}}`;
    result = result.replace(placeholder, value);
  }
  return result;
}

/**
 * Build the query string portion of the URL.
 * Only includes required parameters and those with example values.
 */
function buildQueryString(queryParams?: CurlParam[]): string {
  if (!queryParams || queryParams.length === 0) return '';

  const parts: string[] = [];
  for (const param of queryParams) {
    if (param.example !== undefined) {
      parts.push(`${encodeURIComponent(param.name)}=${encodeURIComponent(String(param.example))}`);
    } else if (param.required) {
      parts.push(`${encodeURIComponent(param.name)}=\${${param.name.toUpperCase()}}`);
    }
  }

  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

/**
 * Determine whether the operation requires API key and/or App key auth.
 * Falls back to including both if no security block is provided.
 */
function getAuthHeaders(security?: any[]): { apiKey: boolean; appKey: boolean } {
  if (!security || security.length === 0) {
    return { apiKey: true, appKey: true };
  }

  let apiKey = false;
  let appKey = false;

  for (const requirement of security) {
    if (requirement.apiKeyAuth !== undefined) apiKey = true;
    if (requirement.appKeyAuth !== undefined) appKey = true;
  }

  // Default to both if we couldn't determine from the security block
  if (!apiKey && !appKey) {
    return { apiKey: true, appKey: true };
  }

  return { apiKey, appKey };
}

/**
 * Determine whether the method typically sends a request body.
 */
function methodHasBody(method: string): boolean {
  const upper = method.toUpperCase();
  return upper === 'POST' || upper === 'PUT' || upper === 'PATCH';
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * Generate a curl command string for an API operation.
 *
 * The output includes shell variable exports as comments and a multi-line
 * curl command suitable for display in documentation.
 */
export function generateCurl(options: GenerateCurlOptions): string {
  const {
    method,
    path,
    site = 'datadoghq.com',
    subdomain = 'api',
    pathParams,
    queryParams,
    requestBodyJson,
    security,
  } = options;

  const auth = getAuthHeaders(security);
  const interpolatedPath = interpolatePath(path, pathParams);
  const queryString = buildQueryString(queryParams);
  const url = `https://${subdomain}.${site}${interpolatedPath}${queryString}`;

  const lines: string[] = [];

  // --- Shell variable exports as comments ---
  lines.push(`# Set your Datadog site and credentials`);
  lines.push(`export DD_SITE="${site}"`);
  if (auth.apiKey) {
    lines.push(`export DD_API_KEY="<DD_API_KEY>"`);
  }
  if (auth.appKey) {
    lines.push(`export DD_APP_KEY="<DD_APP_KEY>"`);
  }
  lines.push('');

  // --- curl command ---
  const curlParts: string[] = [];
  curlParts.push(`curl -X ${method.toUpperCase()} "${url}"`);

  if (auth.apiKey) {
    curlParts.push(`-H "DD-API-KEY: \${DD_API_KEY}"`);
  }
  if (auth.appKey) {
    curlParts.push(`-H "DD-APPLICATION-KEY: \${DD_APP_KEY}"`);
  }

  // Content-Type and Accept headers
  if (requestBodyJson || methodHasBody(method)) {
    curlParts.push(`-H "Content-Type: application/json"`);
  }
  curlParts.push(`-H "Accept: application/json"`);

  // Request body
  if (requestBodyJson) {
    curlParts.push(`-d @- << EOF`);
  }

  // Join with line-continuation backslashes
  const curlCommand = curlParts.join(' \\\n');
  lines.push(curlCommand);

  // Append body after the command if present
  if (requestBodyJson) {
    lines.push(requestBodyJson);
    lines.push('EOF');
  }

  return lines.join('\n');
}
