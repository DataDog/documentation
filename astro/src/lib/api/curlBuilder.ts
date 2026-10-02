/**
 * Curl command generation from OpenAPI operation data.
 *
 * Produces a copy-pasteable curl snippet for each API endpoint,
 * including auth headers, query parameters, and request body.
 */

import type { OpenAPIV3 } from "openapi-types";
import type {
  CurlParam,
  CurlSecurityScheme,
  GenerateCurlOptions,
} from "./schemas/curl";

type SecurityRequirement = OpenAPIV3.SecurityRequirementObject;

/** Auth to render: shell exports, `-H` flags, and URL query parts. */
interface CurlAuth {
  exportLines: string[];
  headers: string[];
  queryParts: string[];
}

/** Used when the caller doesn't supply the spec's security data. */
const DEFAULT_SECURITY: SecurityRequirement[] = [
  { apiKeyAuth: [], appKeyAuth: [] },
];
const DEFAULT_SECURITY_SCHEMES: Record<string, CurlSecurityScheme> = {
  apiKeyAuth: {
    type: "apiKey",
    in: "header",
    name: "DD-API-KEY",
    "x-env-name": "DD_API_KEY",
  },
  appKeyAuth: {
    type: "apiKey",
    in: "header",
    name: "DD-APPLICATION-KEY",
    "x-env-name": "DD_APP_KEY",
  },
};

/** The OAuth scheme; a requirement of AuthZ alone also accepts a PAT or SAT. */
const OAUTH_SCHEME_NAME = "AuthZ";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * Generate a curl command string for an API operation.
 *
 * The output includes shell variable exports as comments and a multi-line
 * curl command suitable for display in documentation.
 */
export function buildCurlCommand(options: GenerateCurlOptions): string {
  const {
    method,
    path,
    site = "datadoghq.com",
    subdomain = "api",
    pathParams,
    queryParams,
    requestBodyJson,
    security,
    globalSecurity,
    securitySchemes = DEFAULT_SECURITY_SCHEMES,
  } = options;

  const auth = resolveCurlAuth(
    security ?? globalSecurity ?? DEFAULT_SECURITY,
    securitySchemes,
  );
  const interpolatedPath = interpolatePath(path, pathParams);
  const queryString = buildQueryString(queryParams, auth.queryParts);
  const url = `https://${subdomain}.${site}${interpolatedPath}${queryString}`;

  const lines: string[] = [];

  // --- Shell variable exports as comments ---
  lines.push(`# Set your Datadog site and credentials`);
  lines.push(`export DD_SITE="${site}"`);
  lines.push(...auth.exportLines);
  lines.push("");

  // --- curl command ---
  const curlParts: string[] = [];
  curlParts.push(`curl -X ${method.toUpperCase()} "${url}"`);
  curlParts.push(...auth.headers);

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
  const curlCommand = curlParts.join(" \\\n");
  lines.push(curlCommand);

  // Append body after the command if present
  if (requestBodyJson) {
    lines.push(requestBodyJson);
    lines.push("EOF");
  }

  return lines.join("\n");
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
 * Only includes required parameters and those with example values,
 * followed by any auth query parts.
 */
function buildQueryString(
  queryParams: CurlParam[] = [],
  authQueryParts: string[] = [],
): string {
  const parts: string[] = [];
  for (const param of queryParams) {
    if (param.example !== undefined) {
      parts.push(
        `${encodeURIComponent(param.name)}=${encodeURIComponent(String(param.example))}`,
      );
    } else if (param.required) {
      parts.push(
        `${encodeURIComponent(param.name)}=\${${param.name.toUpperCase()}}`,
      );
    }
  }

  parts.push(...authQueryParts);

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

/**
 * Decide how the example authenticates: a bearer token when the operation
 * accepts one, otherwise the credentials of a single key-based requirement.
 */
function resolveCurlAuth(
  security: SecurityRequirement[],
  securitySchemes: Record<string, CurlSecurityScheme>,
): CurlAuth {
  if (acceptsBearerToken(security)) return bearerTokenAuth();
  return requirementAuth(pickKeyRequirement(security), securitySchemes);
}

/** True when some requirement is the OAuth scheme on its own. */
function acceptsBearerToken(security: SecurityRequirement[]): boolean {
  return security.some((requirement) => {
    const schemeNames = Object.keys(requirement);
    return schemeNames.length === 1 && schemeNames[0] === OAUTH_SCHEME_NAME;
  });
}

function bearerTokenAuth(): CurlAuth {
  return {
    exportLines: [
      "# Use a Personal Access Token or Service Access Token",
      'export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"',
    ],
    headers: ['-H "Authorization: Bearer ${DD_BEARER_TOKEN}"'],
    queryParts: [],
  };
}

/** The first requirement without the OAuth scheme, else the first one. */
function pickKeyRequirement(
  security: SecurityRequirement[],
): SecurityRequirement {
  return (
    security.find((requirement) => !(OAUTH_SCHEME_NAME in requirement)) ??
    security[0] ??
    {}
  );
}

/**
 * Render each scheme in the requirement as a header or query param, reading
 * names from the spec. Schemes without a usable location are skipped.
 */
function requirementAuth(
  requirement: SecurityRequirement,
  securitySchemes: Record<string, CurlSecurityScheme>,
): CurlAuth {
  const envNames = new Set<string>();
  const headers: string[] = [];
  const queryParts: string[] = [];

  for (const schemeName of Object.keys(requirement)) {
    const securityScheme = securitySchemes[schemeName];
    const envName = securityScheme?.["x-env-name"];
    if (!securityScheme || !envName) continue;

    if (securityScheme.in === "header" && securityScheme.name) {
      headers.push(`-H "${securityScheme.name}: \${${envName}}"`);
    } else if (securityScheme.in === "query" && securityScheme.name) {
      queryParts.push(
        `${encodeURIComponent(securityScheme.name)}=\${${envName}}`,
      );
    } else if (securityScheme.scheme === "bearer") {
      headers.push(`-H "Authorization: Bearer \${${envName}}"`);
    } else {
      continue;
    }
    envNames.add(envName);
  }

  const exportLines = [...envNames].map(
    (envName) => `export ${envName}="<${envName}>"`,
  );
  return { exportLines, headers, queryParts };
}

/**
 * Determine whether the method typically sends a request body.
 */
function methodHasBody(method: string): boolean {
  const upper = method.toUpperCase();
  return upper === "POST" || upper === "PUT" || upper === "PATCH";
}
