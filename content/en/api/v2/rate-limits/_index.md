---
title: Rate Limits
type: api
---

{{< h2 >}}Rate Limits{{< /h2 >}}

All of the API endpoints are rate limited. Once you exceed a certain number of requests in a specific period, Datadog returns an error.

If you are rate limited, you will see a 429 in the response code. Datadog recommends to either wait the time designated by the `X-RateLimit-Period` before making calls again, or you should switch to making calls at a frequency slightly longer than the `X-RateLimit-Limit` / `X-RateLimit-Period`.

Rate limits can be increased from the defaults by [contacting the Datadog support team][1].

Regarding the API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][2] for more info on how the metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][3] based on your agreement.
- The rate limit for event submission is `500,000` events per hour per organization.
- The rate limit for event aggregation is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
- The rate limits for endpoints vary and are included in the headers detailed below. These can be extended on demand.

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
