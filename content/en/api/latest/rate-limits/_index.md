---
title: Rate Limits
type: documentation
---

{{< h2 >}}Rate Limits{{< /h2 >}}

Many API endpoints are rate limited. Once you exceed a certain number of requests in a specific period, Datadog returns an error.

If you are rate limited, you can see a 429 in the response code. You can either wait the designated time by the `X-RateLimit-Period` before making calls again, or switch to making calls at a frequency slightly longer than the `X-RateLimit-Limit` or `X-RateLimit-Period`.

Rate limits can be increased from the defaults by [contacting the Datadog support team][1].

Regarding the API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][2] for more info on how the metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][3] based on your agreement.
- The API for sending logs is not rate limited.
- The rate limit for event submission is `500,000` events per hour per organization.
- The rate limits for endpoints vary and are included in the headers detailed below. These can be extended on demand.

<div class="alert alert-warning">
The list above is not comprehensive of all rate limits on Datadog APIs. If you are experiencing rate limiting, reach out to <a href="https://www.datadoghq.com/support/">support</a> for more information about the APIs you're using and their limits.</div>

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in the current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |
| `X-RateLimit-Name`      | name of the rate limit for increase requests             |

{{< h3 >}}Datadog API Usage Metrics{{< /h3 >}}

All Datadog APIs have a limit to the amount of usage in a given period of time. APIs can have unique, distinct rate limit buckets or be grouped together into a single bucket depending on the resource(s) being used. For example, the monitor status API has a rate limit that allows a human or automation script to query only so many times per minute. The endpoint rejects excess requests with a 429 response code and a hint to back off until a reset period has expired. API usage metrics allow Datadog users to self-service and audit API rate limit consumption for API endpoints (exclusive of metrics, logs, and event submission endpoints). These metrics provide a picture of allowed and blocked requests and are provided with the following dimensions and available tags:

{{< h4 >}}Available Metrics{{< /h4 >}}

<table>
  <thead>
    <th>Dimensions</th>
    <th>Usage metric</th>
    <th>Description</th>
    <th>Available Tags</th>
  </thead>
  <tr>
    <td rowspan="2"><strong>Org</strong></td>
    <td><code>datadog.apis.usage.per_org</code></td>
    <td>Number of API requests made to a specific API endpoint that is an organization wide rate limit.</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_org_ratio</code></td>
    <td>Ratio of API requests by available dimensions to total number of requests (<code>limit_count</code>) allowed.</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>User (UUID)</strong></td>
    <td><code>datadog.apis.usage.per_user</code></td>
    <td>Number of API requests made for a specific API endpoint that is rate limited per unique user.</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_user_ratio</code></td>
    <td>Ratio of API requests by available dimensions to total number of requests (<code>limit_count</code>) allowed.</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>API Key</strong></td>
    <td><code>datadog.apis.usage.per_api_key</code></td>
    <td>Number of API requests made for a specific API endpoint that is rate limited per unique API Key used</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_api_key_ratio</code></td>
    <td>Ratio of API requests by available dimensions to total number of requests (<code>limit_count</code>) allowed.</td>
    <td>
      <code>app_key_id</code><br />
      <code>child_org</code> (on parent only)<br /><code>limit_count</code><br />
      <code>limit_name</code><br />
      <code>limit_period</code><br />
      <code>rate_limit_status</code><br />
      <code>user_uuid</code>
    </td>
  </tr>
</table>


{{< h4 >}}Tag Key{{< /h4 >}}


| Tag Name | Description |
| -------- | ----------- |
| app_key_id | Application Key ID used by API Client. This can be N/A for web or mobile users and open endpoints. |
| child_org | Name of child org, if viewing from the parent org. Otherwise, set to N/A. This only applies within the same datacenter. |
| limit_count | Number of requests available to each rate limit name during a request period. |
| limit_name | Name of rate limit. Different endpoints can share the same name. |
| limit_period | Time in seconds for each rate limit name before the consumption count is reset. |
| rate_limit_status | `passed`: Request was not blocked<br />`blocked`: Request was blocked due to rate limits breached |
| user_uuid | UUID of user for API consumption. |

{{< h4 >}}Rollup in widgets{{< /h4 >}}
Metric visualizations should generally be rolled up to the minute using sum(60s) to aggregate the total number of requests per minute.

Ratio metrics are already normalized to the corresponding `limit_period`.

{{< h5 >}}Example use cases{{< /h5 >}}

| Use Case | Example |
| -------- | ------- |
| Requests by Rate Limit Name | Graph the sum of `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` and `datadog.apis.usage.per_api_key` group by `limit_name`<br /><br />`default_zero(sum:datadog.apis.usage.per_org{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{*} by {limit_name})` |
| Blocked by Rate Limit Name | Graph the sum of `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` and `datadog.apis.usage.per_api_key` by `limit_name` with `rate_limit_status:blocked`<br /><br />`default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked} by {limit_name})` |
| Blocked Endpoint by User | Graph the sum of `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` and `datadog.apis.usage.per_api_key` by `user_uuid` with `rate_limit_status:blocked` and `limit_name:example`<br /><br />`default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {user_uuid})` |
| Blocked Endpoint by App Key ID | Graph the sum of `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user` and `datadog.apis.usage.per_api_key` by `app_key_id` with `rate_limit_status:blocked` and `limit_name:example`<br /><br />`default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {app_key_id})` |
| Ratio of Rate Limits Used by Rate Limit Name | Graph the sum of `datadog.apis.usage.per_org_ratio`, `datadog.apis.usage.per_user_ratio` and `datadog.apis.usage.per_api_key_ratio` group by `limit_name`<br /><br />`default_zero(max:datadog.apis.usage.per_org_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_user_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_api_key_ratio{*} by {limit_name})` |


{{< h3 >}}Increasing your Rate Limit{{< /h3 >}}
On a case by case basis, users can request rate limits to be increased by providing the following details in a Support ticket under Help -> New Support Ticket. Upon receiving a rate limit increase, our Support Engineering team reviews the use case and if needed, works with internal engineering resources to confirm the viability of the rate limit increase request.

    Title:
        Request to increase rate limit on endpoint: X

    Details:
        We would like to request a rate limit increase for API endpoint: X
        Example use cases/queries:
            Example API call as CURL or as URL with example payload

        Motivation for increasing rate limit:
            Example - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day.

        Desired target rate limit:
            Having a specific limit increase in mind or a percentage increase in mind helps Support Engineering expedite the request to internal Engineering teams for review.

Once Datadog Support reviews and approves the use case, a rate limit increase can be applied behind the scenes. Note that there is a maximum to how much a rate limit can be increased due to the SaaS nature of Datadog. Datadog Support reserves the right to reject rate limit increases based on use cases and Engineering recommendations.

{{< h3 >}}Audit Logs{{< /h3 >}}
API limit and usage metrics provide insight into usage patterns and blocked requests. If you need additional details, Audit Trail offers more granular visibility into API activity.

With Audit Trail, you can for instance view:
* **IP address & geolocation** – Identify where API requests originated.
* **Actor type** – Distinguish between service accounts and user accounts.
* **API vs. App Key authentication** – See whether requests were made through an API key or directly by a user.
* **Correlated events** – View other events occurring at the same time, such as configuration changes or security-related actions.

Audit Trail can help teams troubleshoot rate limit issues by providing more context on API consumption and blocked requests. It also enables tracking of API usage across an organization for security and compliance purposes.

For more detailed visibility into API activity, consider using **[Audit Trail][4]**.


[1]: /help/
[2]: /api/v1/metrics/
[3]: /metrics/custom_metrics/
[4]: /account_management/audit_trail/events/
