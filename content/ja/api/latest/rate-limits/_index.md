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

[1]: /help/
[2]: /api/v1/metrics/
[3]: /metrics/custom_metrics/
