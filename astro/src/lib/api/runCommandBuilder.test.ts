import { describe, it, expect } from "vitest";
import { buildRunCommand } from "@lib/api/runCommandBuilder";
import type { SecurityRequirement } from "@lib/api/curlBuilder";

const bearerSecurity: SecurityRequirement[] = [
  { apiKeyAuth: [], appKeyAuth: [] },
  { AuthZ: ["dashboards_read"] },
];
const go = { runCommand: 'go run "main.go"', canUseBearerToken: true };
const rust = { runCommand: "cargo run", canUseBearerToken: false };

describe("buildRunCommand", () => {
  it("uses a bearer token when the operation and language accept one", () => {
    expect(
      buildRunCommand({
        site: "datadoghq.eu",
        ...go,
        security: bearerSecurity,
      }),
    ).toBe(
      'DD_SITE="datadoghq.eu" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" go run "main.go"',
    );
  });

  it("uses keys when the language can't use a bearer token", () => {
    expect(
      buildRunCommand({
        site: "datadoghq.com",
        ...rust,
        security: bearerSecurity,
      }),
    ).toBe(
      'DD_SITE="datadoghq.com" DD_API_KEY="<DD_API_KEY>" DD_APP_KEY="<DD_APP_KEY>" cargo run',
    );
  });

  it("uses short placeholders when the operation inherits global security", () => {
    expect(
      buildRunCommand({
        site: "datadoghq.com",
        ...rust,
        globalSecurity: [{ apiKeyAuth: [], appKeyAuth: [] }],
      }),
    ).toBe(
      'DD_SITE="datadoghq.com" DD_API_KEY="<API-KEY>" DD_APP_KEY="<APP-KEY>" cargo run',
    );
  });

  it("includes only the schemes in the operation's requirement", () => {
    expect(
      buildRunCommand({
        site: "datadoghq.com",
        ...go,
        security: [{ apiKeyAuth: [] }],
      }),
    ).toBe(
      'DD_SITE="datadoghq.com" DD_API_KEY="<DD_API_KEY>" go run "main.go"',
    );
  });

  it("omits auth when the operation declares no security", () => {
    expect(
      buildRunCommand({ site: "datadoghq.com", ...go, security: [] }),
    ).toBe('DD_SITE="datadoghq.com" go run "main.go"');
  });
});
