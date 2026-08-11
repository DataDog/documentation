export const prerender = true;
/**
 * Plaintext rendering of the OAuth scopes page.
 *
 * The source markdown below is static English content (data, not i18n strings),
 * so it lives here verbatim. It is parsed then re-emitted via `format()` so it
 * round-trips the same way the endpoint pages do. Mirrors the HTML page in
 * `scopes.astro`.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { format, parse } from "@lib/plaintext/helpers";

const SOURCE = `# Authorization Scopes

## Authorization scopes for OAuth clients

Scopes are an authorization mechanism that allow you to limit and define the specific access applications have to an organization's Datadog data. When authorized to access data on behalf of a user or service account, applications can only access the information explicitly permitted by their assigned scopes.

> **Note:** This page lists only the authorization scopes that can be assigned to OAuth clients. To view the full list of assignable permissions for scoped application keys, see [Datadog Role Permissions](/account_management/rbac/permissions/#permissions-list).
>
> - **OAuth clients** — Can only be assigned authorization scopes (limited set).
> - **Scoped application keys** — Can be assigned any Datadog permission.

The best practice for scoping applications is to follow the principle of least privilege. Assign only the minimum scopes necessary for an application to function as intended. This enhances security and provides visibility into how applications interact with your organization's data. For example, a third-party application that only reads dashboards does not need permissions to delete or manage users.

You can use authorization scopes with OAuth2 clients for your [Datadog Apps](/extend/authorization/oauth2_in_datadog).
`;

const body = format(parse(SOURCE)).trim() + "\n";

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === "en" ? undefined : lang },
  }));
};

export const GET: APIRoute = ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
