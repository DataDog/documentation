---
title: Rate Limits
type: api
---

{{< h2 >}}Rate Limits{{< /h2 >}}

All of the API endpoints are rate limited. Once you exceed a certain number of requests in a specific period, Datadog returns an error.

For rate-limited API endpoints, Datadog returns headers to show how close you are to your limit. If you exceed your limit, review these headers to determine when you can try again.

Rate limits can be increased from the defaults by [contacting the Datadog support team][1].

Regarding the API rate limit policy:

- Datadog **does not rate limit** on data point/metric submission (see [metrics section][2] for more info on how the metric submission rate is handled). Limits encounter is dependent on the quantity of [custom metrics][3] based on your agreement.
- The rate limit for metric **retrieval** is `100` per hour per organization.
- The rate limit for event submission is `1000` per aggregate per day per organization. An aggregate is a group of similar events.
- The rate limit for the [Query a Timeseries API][4] call is `1600` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Query API][5] call is `300` per hour per organization. This can be extended on demand.
- The rate limit for the [Graph a Snapshot API][6] call is `60` per hour per organization. This can be extended on demand.
- The rate limit for the [Log Configuration API][7] is `6000` per minute per organization. This can be extended on demand.

| Rate Limit Headers      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | number of requests allowed in a time period.             |
| `X-RateLimit-Period`    | length of time in seconds for resets (calendar aligned). |
| `X-RateLimit-Remaining` | number of allowed requests left in the current time period.  |
| `X-RateLimit-Reset`     | time in seconds until next reset.                        |

[1]: /help/
[2]: /api/v1/metrics/
[3]: /developers/metrics/custom_metrics/
[4]: /api/v1/metrics/#query-timeseries-points
[5]: /api/v1/logs/#get-a-list-of-logs
[6]: /api/v1/snapshots/
[7]: /api/v1/logs-indexes/
