/**
 * Builds the shell command shown under SDK code examples, e.g.
 * `DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<...>" go run "main.go"`.
 */

import type { CurlSecurityScheme } from "./schemas/curl";
import {
  acceptsBearerToken,
  DEFAULT_SECURITY,
  DEFAULT_SECURITY_SCHEMES,
  pickKeyRequirement,
  type SecurityRequirement,
} from "./curlBuilder";

interface RunCommandOptions {
  site: string;
  runCommand: string;
  canUseBearerToken: boolean;
  security?: SecurityRequirement[];
  globalSecurity?: SecurityRequirement[];
  securitySchemes?: Record<string, CurlSecurityScheme>;
}

/** Placeholders for operations that inherit global security. */
const INHERITED_PLACEHOLDERS_BY_ENV_NAME: Record<string, string> = {
  DD_API_KEY: "API-KEY",
  DD_APP_KEY: "APP-KEY",
};

export function buildRunCommand(options: RunCommandOptions): string {
  const {
    site,
    runCommand,
    canUseBearerToken,
    security,
    globalSecurity,
    securitySchemes = DEFAULT_SECURITY_SCHEMES,
  } = options;
  const effectiveSecurity = security ?? globalSecurity ?? DEFAULT_SECURITY;

  const authAssignments =
    canUseBearerToken && acceptsBearerToken(effectiveSecurity)
      ? ['DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"']
      : keyAssignments(
          pickKeyRequirement(effectiveSecurity),
          securitySchemes,
          security === undefined,
        );

  return [`DD_SITE="${site}"`, ...authAssignments, runCommand].join(" ");
}

function keyAssignments(
  requirement: SecurityRequirement,
  securitySchemes: Record<string, CurlSecurityScheme>,
  inheritsGlobalSecurity: boolean,
): string[] {
  return Object.keys(requirement).flatMap((schemeName) => {
    const securityScheme = securitySchemes[schemeName];
    const envName = securityScheme?.["x-env-name"];
    if (securityScheme?.in !== "header" || !envName) return [];
    const placeholder =
      (inheritsGlobalSecurity && INHERITED_PLACEHOLDERS_BY_ENV_NAME[envName]) ||
      envName;
    return [`${envName}="<${placeholder}>"`];
  });
}
