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
- The rate limit for event submission is `500,000` events per hour per organization.
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

All Datadog APIs have a usage limit for a given period of time. APIs can have unique, distinct rate limit buckets or be grouped together into a single bucket depending on the resource(s) being used. For example, the monitor status API has a rate limit that allows a human or automation script to query only so many times per minute. The endpoint rejects excess requests with a 429 response code and a hint to back off until a reset period has expired. API usage metrics allow Datadog users to self-service and audit API rate limit consumption for API endpoints (excluding metrics, logs, and event submission endpoints). Use the following dashboard, metrics, and tags to view allowed and blocked requests:

[Datadog API Rate Limit Visibility dashboard][5]

#### Rate limit visibility metrics

The rate limit visibility metrics use the `datadog.apis.rate_limit.usage` namespace. The metric name identifies the scope of the configured rate limit:

| Scope | Allowed requests | Blocked requests | Utilization |
|-------|------------------|------------------|-------------|
| Organization | `datadog.apis.rate_limit.usage.per_org_count` | `datadog.apis.rate_limit.usage.per_org_blocked_count` | `datadog.apis.rate_limit.usage.per_org_pct` |
| User | `datadog.apis.rate_limit.usage.per_user_count` | `datadog.apis.rate_limit.usage.per_user_blocked_count` | `datadog.apis.rate_limit.usage.per_user_pct` |
| API key | `datadog.apis.rate_limit.usage.per_api_key_count` | `datadog.apis.rate_limit.usage.per_api_key_blocked_count` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

The `*_count` metrics count requests that the API allowed. The `*_blocked_count` metrics count requests that the API rejected because they exceeded a rate limit. The `*_pct` metrics measure total attempted requests, including allowed and blocked requests, as a percentage of the configured limit. A value of `100` represents full utilization, and values can exceed `100`.

For dashboard widgets, sum the `*_count` and `*_blocked_count` metrics over the displayed interval. Use the maximum `*_pct` value for the interval to show peak utilization.

In addition to the per-scope metrics, the `datadog.apis.rate_limit.usage.limit_count` gauge reports the configured request limit for each rate limit name and scope.

##### Available tags

| Tag name | Description | Availability |
|----------|-------------|--------------|
| `app_key_id` | Application key ID associated with the request. The value is empty when the request does not use an application key. | Count, blocked count, and utilization metrics |
| `limit_name` | Name of the rate limit. Different endpoints can share the same name. | All metrics |
| `limit_type` | Scope of the rate limit: `per_org`, `per_user`, or `per_api_key`. | All metrics |
| `user_uuid` | UUID of the user associated with the request. | Count, blocked count, and utilization metrics |

##### Query examples

Allowed requests by rate limit name
: Graph the sum of the three `*_count` metrics by `limit_name`.<br /><br />
  **Example:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_count{*} by {limit_name})`

Blocked requests by rate limit name
: Graph the sum of the three `*_blocked_count` metrics by `limit_name`.<br /><br />
  **Example:** `default_zero(sum:datadog.apis.rate_limit.usage.per_org_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_user_blocked_count{*} by {limit_name}) + default_zero(sum:datadog.apis.rate_limit.usage.per_api_key_blocked_count{*} by {limit_name})`

#### Migrate from legacy usage metrics

The `datadog.apis.rate_limit.usage.*` metrics replace the `datadog.apis.usage.*` metrics. Update dashboards and monitors with the following replacements:

| Legacy metric | Replacement metric |
|---------------|--------------------|
| `datadog.apis.usage.per_org` | `datadog.apis.rate_limit.usage.per_org_count` |
| `datadog.apis.usage.per_org_ratio` | `datadog.apis.rate_limit.usage.per_org_pct` |
| `datadog.apis.usage.per_user` | `datadog.apis.rate_limit.usage.per_user_count` |
| `datadog.apis.usage.per_user_ratio` | `datadog.apis.rate_limit.usage.per_user_pct` |
| `datadog.apis.usage.per_api_key` | `datadog.apis.rate_limit.usage.per_api_key_count` |
| `datadog.apis.usage.per_api_key_ratio` | `datadog.apis.rate_limit.usage.per_api_key_pct` |

The replacement metrics do not emit the legacy `child_org`, `limit_period`, or `rate_limit_status` tags. Organization ownership is implicit because these metrics are submitted to the customer organization. Use the corresponding `*_blocked_count` metric for blocked requests instead of filtering on `rate_limit_status:blocked`. The configured limit previously supplied by the `limit_count` tag is available as the `datadog.apis.rate_limit.usage.limit_count` gauge.

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
[5]: https://app.datadoghq.com/dashboard/lists?q=Datadog%20API%20Rate%20Limit%20Visibility&p=1
