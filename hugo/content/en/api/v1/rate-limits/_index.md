---
title: Rate Limits
type: api
---

{{< h2 >}}Rate Limits{{< /h2 >}}

All of the API endpoints are rate limited. Once you exceed a certain number of requests in a specific period, Datadog returns an error.

If you are rate limited, you can see a 429 in the response code. You can either wait the designated time by the `X-RateLimit-Period` before making calls again, or switch to making calls at a frequency slightly longer than the `X-RateLimit-Limit` or `X-RateLimit-Period`.

Rate limits can be increased from the defaults by [contacting the Datadog support team][1].

Regarding the API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][2] for more info on how the metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][3] based on your agreement.
- The API for sending logs is not rate limited.
- The rate limit for event submission is `50,000` events per minute per organization.
- The rate limits for endpoints vary and are included in the headers detailed below. These can be extended on demand.

<div class="alert alert-danger">
The list above is not comprehensive of all rate limits on Datadog APIs. If you are experiencing rate limiting, reach out to <a href="https://www.datadoghq.com/support/">support</a> for more information about the APIs you're using and their limits.</div>

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in the current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |
| `X-RateLimit-Name`      | name of the rate limit for increase requests.            |

### Datadog API usage metrics

All Datadog APIs have a usage limit for a given period of time. APIs can have unique, distinct rate limit buckets or be grouped together into a single bucket depending on the resource(s) being used. For example, the monitor status API has a rate limit that allows a human or automation script to query only so many times per minute. The endpoint rejects excess requests with a 429 response code and a hint to back off until a reset period has expired. API usage metrics allow Datadog users to self-service and audit API rate limit consumption for API endpoints (excluding metrics, logs, and event submission endpoints). Use the following dashboard, metrics, and tags to view allowed and blocked requests.

See the [Datadog API Rate Limit Visibility dashboard][5] for a prebuilt view of these metrics.

#### Rate limit visibility metrics

The rate limit visibility metrics use the `datadog.apis.rate_limit.usage.*` namespace. The metric name identifies the scope of the configured rate limit:

| Scope | Allowed requests | Blocked requests | Utilization |
|-------|------------------|------------------|-------------|
| Organization | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| User | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| API key | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

The allowed-request metrics count requests that the API allowed. The blocked-request metrics count requests that the API rejected because they exceeded a rate limit. The `*_pct` metrics report total attempted requests (allowed plus blocked) as a percentage of the configured limit, where `100` represents full utilization. Values above `100` indicate that requests were blocked because the limit was exceeded.

For dashboard widgets, use a minute-level `sum(60s)` rollup for the allowed-request and blocked-request metrics to show requests per minute. Use the maximum `*_pct` value for the interval to show peak utilization. Wrap each term in `default_zero()` when combining metrics with `+`, as shown in the query examples below.

The following gauges report the configured request limit for each rate limit name. The metric name identifies the scope:

| Scope | Configured request limit |
|-------|--------------------------|
| Organization | `datadog.apis.rate_limit.usage.per_org_limit_count` |
| User | `datadog.apis.rate_limit.usage.per_user_limit_count` |
| API key | `datadog.apis.rate_limit.usage.per_api_key_limit_count` |

##### Available tags

| Tag name | Description | Availability |
|----------|-------------|--------------|
| `app_key_id` | Application key ID associated with the request. The tag is present with an empty value when the request does not use an application key. | Count, blocked count, and utilization metrics |
| `child_org_name` | Display name of the child organization represented by a copied metric. | All metrics with `org_scope:child_org` |
| `limit_name` | Name of the rate limit. Different endpoints can share the same name. | All metrics |
| `org_scope` | Relationship between the metric and the organization viewing it: `current_org` for that organization's own traffic or `child_org` for a child-organization copy visible from its root organization. | All metrics |
| `user_uuid` | UUID of the user associated with the request. | Count, blocked count, and utilization metrics |

When you view metrics from a child organization, its own metrics use `org_scope:current_org`. The `org_scope:child_org` value and `child_org_name` tag appear only on the additional copies sent to the root organization.

##### Query examples

Allowed requests by rate limit name
: Graph the sum of the three `*_count` metrics by `limit_name`.<br /><br />
  **Example:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

Blocked requests by rate limit name
: Graph the sum of the three `*_blocked_count` metrics by `limit_name`.<br /><br />
  **Example:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### Migrate from legacy usage metrics

The `datadog.apis.rate_limit.usage.*` metrics replace the `datadog.apis.usage.*` metrics. Update dashboards and monitors with the following replacements. Queries on the legacy `datadog.apis.usage.*` metrics that were not filtered by `rate_limit_status` counted allowed and blocked requests together; to preserve that total, add the corresponding `*_blocked_count` metric alongside the `*_count` replacement.

| Legacy metric | Replacement metric |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

The replacement metrics differ from the legacy metrics in the following ways:

- Allowed and blocked requests use separate metrics instead of the `rate_limit_status` tag. Replace legacy status filters with the corresponding allowed-request or blocked-request metric. Utilization metrics combine allowed and blocked requests.
- The `org_scope` and `child_org_name` tags replace the legacy `child_org` tag. From the root organization, filter on `org_scope:child_org` and use `child_org_name` to filter or group by the child's display name. Use `org_scope:current_org` for the viewing organization's own traffic.
- The `limit_count` and `limit_period` tags are not included. Use the corresponding `*_limit_count` gauge for the configured request limit. Read the rate limit period from the `X-RateLimit-Period` response header.

### Increase your rate limit
You can request increased rate limits by creating a Support ticket with the below details under **Help** > **New Support Ticket**. Upon receiving a rate limit increase, our Support Engineering team reviews the request on a case-by-case basis and, if needed, works with internal engineering resources to confirm the viability of the rate limit increase request.

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as cURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Tip - Having a specific limit increase or percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

After Datadog Support reviews and approves the use case, they can apply the rate limit increase behind the scenes. Note that there is a maximum to how much a rate limit can be increased due to the SaaS nature of Datadog. Datadog Support reserves the right to reject rate limit increases based on use cases and Engineering recommendations.

### Audit logs
API limit and usage metrics provide insight into usage patterns and blocked requests. If you need additional details, Audit Trail offers more granular visibility into API activity.

With Audit Trail, you can view data such as:
* **IP address & geolocation** – Identify where API requests originated.
* **Actor type** – Distinguish between service accounts and user accounts.
* **API vs. app key authentication** – See whether requests were made through an API key or directly by a user.
* **Correlated events** – View other events occurring at the same time, such as configuration changes or security-related actions.

Audit Trail can help teams troubleshoot rate limit issues by providing more context on API consumption and blocked requests. It also enables tracking of API usage across an organization for security and compliance purposes.

For more detailed visibility into API activity, consider using **[Audit Trail][4]**.


[1]: /help/
[2]: /api/v1/metrics/
[3]: /metrics/custom_metrics/
[4]: /account_management/audit_trail/events/
[5]: https://app.datadoghq.com/dash/integration/datadog_api_rate_limit_visibility
