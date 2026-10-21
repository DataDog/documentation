/**
 * Curl command generation from OpenAPI operation data.
 *
 * Produces a copy-pasteable curl snippet for each API endpoint,
 * including auth headers, query parameters, and request body.
 */

import type { OpenAPIV3 } from "openapi-types";
import type {
  CurlFormField,
  CurlParam,
  CurlSecurityScheme,
  GenerateCurlOptions,
} from "./schemas/curl";

export type SecurityRequirement = OpenAPIV3.SecurityRequirementObject;

/** Auth to render: shell exports, `-H` flags, and URL query parts. */
interface CurlAuth {
  exportLines: string[];
  headers: string[];
  queryParts: string[];
}

/** Used when the caller doesn't supply the spec's security data. */
export const DEFAULT_SECURITY: SecurityRequirement[] = [
  { apiKeyAuth: [], appKeyAuth: [] },
];
export const DEFAULT_SECURITY_SCHEMES: Record<string, CurlSecurityScheme> = {
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
    otherSites = [],
    host,
    otherHosts = [],
    subdomain = "api",
    pathParams,
    queryParams,
    requestBodyJson,
    multipartFormFields,
    hasNoContentResponse = false,
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
  const origin = host ?? `${subdomain}.\${DD_SITE}`;
  const url = `https://${origin}${interpolatedPath}${queryString}`;

  const lines: string[] = [];

  // --- Parameters the URL references by name ---
  const parameterExportLines = buildParameterExportLines(
    pathParams,
    queryParams,
  );
  if (parameterExportLines.length > 0) {
    lines.push(...parameterExportLines, "");
  }

  // --- Shell variable exports as comments ---
  // A fixed host leaves DD_SITE unused, so it isn't exported.
  if (!host) {
    lines.push(`# Set your Datadog site and credentials`);
    lines.push(buildSiteExportLine(site, otherSites));
    lines.push(...auth.exportLines);
    lines.push("");
  } else if (auth.exportLines.length > 0) {
    lines.push(`# Set your Datadog credentials`);
    lines.push(...auth.exportLines);
    lines.push("");
  }

  // --- curl command ---
  if (host && otherHosts.length > 0) {
    lines.push(buildOtherHostsLine(site, otherHosts));
  }
  const curlParts: string[] = [];
  curlParts.push(`curl -X ${method.toUpperCase()} "${url}"`);

  // Accept, Content-Type, then auth, in Hugo's order
  if (!hasNoContentResponse) {
    curlParts.push(`-H "Accept: application/json"`);
  }
  if (multipartFormFields) {
    curlParts.push(`-H "Content-Type: multipart/form-data"`);
  } else if (requestBodyJson || methodHasBody(method)) {
    curlParts.push(`-H "Content-Type: application/json"`);
  }
  curlParts.push(...auth.headers);

  // Request body
  if (multipartFormFields) {
    curlParts.push(...multipartFormFields.map(formFieldFlag));
  } else if (requestBodyJson) {
    curlParts.push(`-d @- << EOF`);
  }

  // Join with line-continuation backslashes
  const curlCommand = curlParts.join(" \\\n");
  lines.push(curlCommand);

  // Append body after the command if present
  if (requestBodyJson && !multipartFormFields) {
    lines.push(requestBodyJson);
    lines.push("EOF");
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * `export DD_SITE="datadoghq.com"`, followed by a comment naming the other
 * sites when there are any, for readers who can't switch sites on the page.
 */
function buildSiteExportLine(site: string, otherSites: string[]): string {
  const exportLine = `export DD_SITE="${site}"`;
  if (otherSites.length === 0) return exportLine;
  return `${exportLine} # Or ${otherSites.join(", ")}`;
}

/**
 * The fixed-host twin of the `# Or <other sites>` comment: each other site's
 * host, since a reader can't build it from DD_SITE.
 */
function buildOtherHostsLine(
  site: string,
  otherHosts: NonNullable<GenerateCurlOptions["otherHosts"]>,
): string {
  const hostList = otherHosts.map(({ site, host }) => `${host} (${site})`);
  return `# For sites other than ${site}, replace the host below with: ${hostList.join(", ")}`;
}

/** Hugo's `-F <name>=<type>`, with `@` when curl should read a file. */
function formFieldFlag(field: CurlFormField): string {
  return `-F ${field.name}=${field.binary ? "@" : ""}${field.type}`;
}

/**
 * Export each path parameter and each required query parameter, as Hugo
 * does, so the `${name}` references in the URL are set. Each exports its
 * example, or `"CHANGE_ME"`.
 */
function buildParameterExportLines(
  pathParams: CurlParam[] = [],
  queryParams: CurlParam[] = [],
): string[] {
  const lines: string[] = [];
  if (pathParams.length > 0) {
    lines.push("# Path parameters", ...pathParams.map(exportParam));
  }
  const requiredQueryParams = queryParams.filter((param) => param.required);
  if (requiredQueryParams.length > 0) {
    lines.push(
      "# Required query arguments",
      ...requiredQueryParams.flatMap(exportQueryParam),
    );
  }
  return lines;
}

function exportParam(param: CurlParam): string {
  return `export ${shellVariableName(param.name)}="${param.example ?? "CHANGE_ME"}"`;
}

/**
 * A parameter name as a valid shell variable name. Bash rejects names with
 * brackets, such as `filter[env]`, so each run of other characters becomes
 * `_` (`filter_env`). Hugo uses the name as is.
 */
function shellVariableName(name: string): string {
  return name.replace(/[^A-Za-z0-9_]+/g, "_").replace(/_+$/, "");
}

/**
 * An exploded array exports one placeholder per item, named and set to
 * `<name>_<index>`, as Hugo does.
 */
function exportQueryParam(param: CurlParam): string[] {
  if (param.explodedItemCount === undefined) return [exportParam(param)];
  return explodedItemNames(param).map(
    (itemName) => `export ${itemName}="${itemName}"`,
  );
}

function explodedItemNames(param: CurlParam): string[] {
  return Array.from(
    { length: param.explodedItemCount ?? 0 },
    (_, index) => `${shellVariableName(param.name)}_${index}`,
  );
}

/**
 * Replace `{param_name}` placeholders in the path with `${param_name}` shell
 * variables, as Hugo does. The values are exported above the command.
 */
function interpolatePath(path: string, pathParams?: CurlParam[]): string {
  if (!pathParams || pathParams.length === 0) return path;

  let result = path;
  for (const param of pathParams) {
    result = result.replace(
      `{${param.name}}`,
      `\${${shellVariableName(param.name)}}`,
    );
  }
  return result;
}

/**
 * Build the query string portion of the URL: each required query parameter
 * as a `${name}` reference (one per item for an exploded array), as Hugo does, then any auth query parts. Optional
 * parameters are left out, even with an example, since a copied filter would
 * narrow the results.
 */
function buildQueryString(
  queryParams: CurlParam[] = [],
  authQueryParts: string[] = [],
): string {
  const parts = queryParams
    .filter((param) => param.required)
    .flatMap((param) => {
      const variableNames =
        param.explodedItemCount === undefined
          ? [shellVariableName(param.name)]
          : explodedItemNames(param);
      return variableNames.map(
        (variableName) =>
          `${encodeURIComponent(param.name)}=\${${variableName}}`,
      );
    });

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
export function acceptsBearerToken(security: SecurityRequirement[]): boolean {
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
export function pickKeyRequirement(
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
