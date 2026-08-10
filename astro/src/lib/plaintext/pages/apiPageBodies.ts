/**
 * Shared plaintext body builders for the API `.md` pages.
 *
 * Each `.md.ts` route and the pages.json API source both call these, so the
 * plaintext that is served and the plaintext that is hashed for `pages.json`
 * come from one place and cannot drift. Keep these byte-identical to what the
 * routes previously produced inline.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type {
  ApiCategory,
  ApiCategoryStub,
  ApiOperationStub,
  ApiOperationView,
} from "@lib/api/schemas/views";
import type { Locale } from "@lib/i18n/locale";
import { localizedHref } from "@lib/i18n/locale";
import { alertNode } from "@components/Alert/plaintext/Alert";
import { apiEndpointSummaryNodes } from "@components/ApiEndpointSummary/plaintext/ApiEndpointSummary";
import { apiEndpointNodes } from "@components/ApiEndpoint/plaintext/ApiEndpoint";
import {
  buildMarkdocStr,
  format,
  heading,
  inline,
  link,
  list,
  listItem,
  nodesFromMd,
  paragraphFromText,
  parse,
} from "@lib/plaintext/helpers";

/** API Reference landing page (`/api/latest.md`). */
export function apiLandingBody(
  categories: ApiCategoryStub[],
  lang: Locale,
): string {
  const items = categories.map((cat) => {
    const href = localizedHref(lang, `/api/latest/${cat.slug}/`);
    return listItem([inline([link(href, cat.name)])]);
  });

  const contents: MarkdocNode[] = [
    heading(1, "API Reference"),
    paragraphFromText(
      "Welcome to the Datadog API Reference. Select a category to get started.",
    ),
    list("unordered", items),
  ];

  return buildMarkdocStr(contents);
}

/** Category summary page (`/api/latest/{category}.md`). */
export function apiCategoryBody(category: ApiCategory, lang: Locale): string {
  const categoryBaseHref = localizedHref(lang, `/api/latest/${category.slug}/`);

  const contents: MarkdocNode[] = [heading(1, category.name)];

  if (category.deprecated) {
    contents.push(
      alertNode("warning", nodesFromMd("This endpoint is deprecated.")),
    );
  }

  if (category.description) {
    contents.push(...nodesFromMd(category.description.trim()));
  }

  for (const operation of category.operations) {
    contents.push(...endpointSummaryNodes(operation, categoryBaseHref));
  }

  return buildMarkdocStr(contents);
}

function endpointSummaryNodes(
  operation: ApiOperationStub,
  baseHref: string,
): MarkdocNode[] {
  return apiEndpointSummaryNodes(operation, `${baseHref}${operation.slug}/`);
}

/** Endpoint detail page (`/api/latest/{category}/{operation}.md`). */
export function apiOperationBody(operation: ApiOperationView): string {
  const contents: MarkdocNode[] = [heading(1, operation.summary)];
  for (const [i, variant] of operation.variants.entries()) {
    const label = i === 0 ? `${variant.version} (latest)` : variant.version;
    contents.push(heading(2, label));
    contents.push(...apiEndpointNodes(variant));
  }
  return buildMarkdocStr(contents);
}

/* ------------------------------------------------------------------ */
/*  Static special pages                                               */
/* ------------------------------------------------------------------ */

// These are static English content (data, not i18n strings), so they live here
// verbatim. Parsed then re-emitted via format() so they round-trip the same way
// the endpoint pages do.
function staticBody(source: string): string {
  return format(parse(source)).trim() + "\n";
}

const USING_THE_API_SOURCE = `# Using the API

## Using the API

Use the Datadog HTTP API to access the Datadog platform programmatically. You can use the API to send data to Datadog, build data visualizations, and manage your account.

## Send data to Datadog

Use the API to begin to send integrations data to Datadog. With some additional setup of the Agent, you can also use the API to send Synthetic test data, Logs, and Traces to Datadog.

**Integrations endpoints**

Available integrations endpoints:

- [AWS Integration](/api/v1/aws-integration/)
- [AWS Logs Integration](/api/v1/aws-logs-integration/)
- [Azure Integration](/api/v1/azure-integration/)
- [Cloudflare Integration](/api/latest/cloudflare-integration/)
- [Fastly Integration](/api/latest/fastly-integration/)
- [Google Cloud Integration](/api/v1/gcp-integration/)
- [Jira Integration](/api/latest/jira-integration/)
- [Microsoft Teams Integration](/api/latest/microsoft-teams-integration/)
- [Okta Integration](/api/latest/okta-integration/)
- [Opsgenie Integration](/api/latest/opsgenie-integration/)
- [PagerDuty Integration](/api/v1/pagerduty-integration/)
- [Slack Integration](/api/v1/slack-integration/)
- [Webhooks Integration](/api/v1/webhooks-integration/)

**Platform endpoints**

Use these endpoints to post and fetch data to and from other parts of the Datadog platform:

- The [metrics](/api/v1/metrics/) endpoints allow you to post [metrics](/metrics/introduction/) data so it can be graphed on Datadog's dashboards and query metrics from any time period.
- The [events](/api/v1/events/) endpoints allow you to post and fetch events to and from the [Datadog event explorer](/events/).
- Use the [Synthetic Monitoring](/api/v1/synthetics/) endpoints to create, start, stop, and see [Synthetic tests](/synthetics/) results.
- Use the [Tracing Agent API](/tracing/guide/send_traces_to_agent_by_api/) to send traces to your Datadog Agent, which then forwards them to Datadog.
- Use the [LLM Observability Export API](/llm_observability/evaluations/export_api) to access your LLM Observability data for running external evaluations and exporting spans for offline storage.

## Visualize your data

After you are sending data to Datadog, you can use the API to build data visualizations programmatically:

- Build [Dashboards](/api/v1/dashboards/) and view [Dashboard Lists](/api/v1/dashboard-lists/)
- Manage [host tags](/api/v1/hosts/)
- Create [Embeddable Graphs](/api/v1/embeddable-graphs/)
- Take a [graph snapshot](/api/v1/snapshots/)
- [Service Dependencies](/api/v1/service-dependencies/) - see a list of your APM services and their dependencies
- Create [Monitors](/api/v1/monitors/)
- [Service Checks](/api/v1/service-checks/) - post check statuses for use with monitors
- Create and manage [Logs](/api/v1/logs/), [Logs Indexes](/api/v1/logs-indexes/), and [Logs Pipelines](/api/v1/logs-pipelines/)
- Get [Host](/api/v1/hosts/) information for your organization
- Create and manage [Service Level Objectives](/api/v1/service-level-objectives/)
- Generate [Security Monitoring](/api/v2/security-monitoring/) signals

## Manage your account

You can also use the Datadog API to manage your account programmatically:

- Manage [Users](/api/v1/users/)
- Manage [Roles](/api/v1/roles/)
- Manage your [Organization](/api/v1/organizations/)
- Verify API and app keys with the [Authentication](/api/v1/authentication/) endpoint
- Grant specific logs access with the [Logs Restriction Queries](/api/v2/logs-restriction-queries/)
- Manage existing keys with [Key Management](/api/v1/key-management/)
- Get hourly, daily, and monthly usage across multiple facets of Datadog with the [Usage Metering](/api/v1/usage-metering/) endpoints
- See the list of IP prefixes belonging to Datadog with [IP Ranges](/api/v1/ip-ranges/)
`;

const SCOPES_SOURCE = `# Authorization Scopes

## Authorization scopes for OAuth clients

Scopes are an authorization mechanism that allow you to limit and define the specific access applications have to an organization's Datadog data. When authorized to access data on behalf of a user or service account, applications can only access the information explicitly permitted by their assigned scopes.

> **Note:** This page lists only the authorization scopes that can be assigned to OAuth clients. To view the full list of assignable permissions for scoped application keys, see [Datadog Role Permissions](/account_management/rbac/permissions/#permissions-list).
>
> - **OAuth clients** — Can only be assigned authorization scopes (limited set).
> - **Scoped application keys** — Can be assigned any Datadog permission.

The best practice for scoping applications is to follow the principle of least privilege. Assign only the minimum scopes necessary for an application to function as intended. This enhances security and provides visibility into how applications interact with your organization's data. For example, a third-party application that only reads dashboards does not need permissions to delete or manage users.

You can use authorization scopes with OAuth2 clients for your [Datadog Apps](/extend/authorization/oauth2_in_datadog).
`;

const RATE_LIMITS_SOURCE = `# Rate Limits

## Rate Limits

Many API endpoints are rate limited. Once you exceed a certain number of requests in a specific period, Datadog returns an error.

If you are rate limited, you can see a 429 in the response code. You can either wait the designated time by the \`X-RateLimit-Period\` before making calls again, or switch to making calls at a frequency slightly longer than the \`X-RateLimit-Limit\` or \`X-RateLimit-Period\`.

Rate limits can be increased from the defaults by [contacting the Datadog support team](/help/).

Regarding the API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section](/api/v1/metrics/) for more info on how the metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics](/metrics/custom_metrics/) based on your agreement.
- The API for sending logs is not rate limited.
- The rate limit for event submission is \`250,000\` events per minute per organization.
- The rate limits for endpoints vary and are included in the headers detailed below. These can be extended on demand.

> **Warning:** The list above is not comprehensive of all rate limits on Datadog APIs. If you are experiencing rate limiting, reach out to [support](https://www.datadoghq.com/support/) for more information about the APIs you're using and their limits.

| Rate Limit Headers | Description |
|---|---|
| \`X-RateLimit-Limit\` | number of requests allowed in a time period. |
| \`X-RateLimit-Period\` | length of time in seconds for resets (calendar aligned). |
| \`X-RateLimit-Remaining\` | number of allowed requests left in the current time period. |
| \`X-RateLimit-Reset\` | time in seconds until next reset. |
| \`X-RateLimit-Name\` | name of the rate limit for increase requests. |

### Datadog API usage metrics

All Datadog APIs have a usage limit for a given period of time. APIs can have unique, distinct rate limit buckets or be grouped together into a single bucket depending on the resource(s) being used. For example, the monitor status API has a rate limit that allows a human or automation script to query only so many times per minute. The endpoint rejects excess requests with a 429 response code and a hint to back off until a reset period has expired. API usage metrics allow Datadog users to self-service and audit API rate limit consumption for API endpoints (excluding metrics, logs, and event submission endpoints). These metrics provide a picture of allowed and blocked requests, and are provided with the following dimensions and available tags:

#### Available metrics

| Dimension | Usage metric | Description | Available Tags |
|---|---|---|---|
| **Org** | \`datadog.apis.usage.per_org\` | The organization-wide rate limit of the number of API requests made to a specific endpoint | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |
| **Org** | \`datadog.apis.usage.per_org_ratio\` | Ratio of API requests by available dimensions to total number of requests (\`limit_count\`) allowed. | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |
| **User (UUID)** | \`datadog.apis.usage.per_user\` | Number of API requests made for a specific API endpoint that is rate limited per unique user. | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |
| **User (UUID)** | \`datadog.apis.usage.per_user_ratio\` | Ratio of API requests by available dimensions to total number of requests (\`limit_count\`) allowed. | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |
| **API Key** | \`datadog.apis.usage.per_api_key\` | Number of API requests made for a specific API endpoint that is rate limited per unique API Key used | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |
| **API Key** | \`datadog.apis.usage.per_api_key_ratio\` | Ratio of API requests by available dimensions to total number of requests (\`limit_count\`) allowed. | \`app_key_id\`, \`child_org\`, \`limit_count\`, \`limit_name\`, \`limit_period\`, \`rate_limit_status\`, \`user_uuid\` |

#### Tag key

| Tag name | Description |
|---|---|
| \`app_key_id\` | Application Key ID used by API client. This can be \`N/A\` for web or mobile users and open endpoints. |
| \`child_org\` | Name of child org, if viewing from the parent org. Otherwise, set to \`N/A\`. This only applies within the same datacenter. |
| \`limit_count\` | Number of requests available to each rate limit name during a request period. |
| \`limit_name\` | Name of rate limit. Different endpoints can share the same name. |
| \`limit_period\` | Time in seconds for each rate limit name before the consumption count is reset. |
| \`rate_limit_status\` | \`passed\`: Request was not blocked. \`blocked\`: Request was blocked due to rate limits breached. |
| \`user_uuid\` | UUID of user for API consumption. |

### Increase your rate limit

You can request increased rate limits by creating a Support ticket with the below details under **Help** > **New Support Ticket**. Upon receiving a rate limit increase, the Support Engineering team reviews the request on a case-by-case basis and, if needed, works with internal engineering resources to confirm the viability of the rate limit increase request.

### Audit logs

API limit and usage metrics provide insight into usage patterns and blocked requests. If you need additional details, Audit Trail offers more granular visibility into API activity.

For more detailed visibility into API activity, consider using [Audit Trail](/account_management/audit_trail/events/).
`;

export const usingTheApiBody = staticBody(USING_THE_API_SOURCE);
export const scopesBody = staticBody(SCOPES_SOURCE);
export const rateLimitsBody = staticBody(RATE_LIMITS_SOURCE);
