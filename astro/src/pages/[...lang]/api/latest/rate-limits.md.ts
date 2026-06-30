/**
 * AST-based plaintext rendering of the rate-limits page.
 *
 * Equivalent to `rate-limits.md.ts`. The source markdown is parsed into a
 * Markdoc AST and re-emitted via `format()`, so the round trip is exercised
 * for the same static content the string version returns directly.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { format, parse } from '@lib/plaintext/helpers';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === 'en' ? undefined : lang },
  }));
};

const SOURCE = `# Rate Limits

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

const BODY = format(parse(SOURCE)).trim() + '\n';

export const GET: APIRoute = ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }
  return new Response(BODY, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
